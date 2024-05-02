import Openrouteservice from "openrouteservice-js";
import L from "leaflet";
import Papa from "papaparse";

// Settings
const apiKey = "5b3ce3597851110001cf6248e16ee360cf82450e9a8d904c5c229c1c";

// Read the data from the csv file
const response = await fetch("/Data_communes_28features.csv");
const file = await response.text();

Papa.parse(file, {
  header: true,
  worker: true, // Don't bog down the main thread if its a big file
  step: function (result) {
    displayMarkerOnMap(result.data);
  },
});

// Display the map on the DOM
const mapNodeDOM = document.getElementById("map");

let map = L.map(mapNodeDOM, {
  center: [46.519962, 6.633597], // Centered on Lausanne, VD
  zoom: 14,
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

// Display the marker on the map
function displayMarkerOnMap(data) {
  const name = data["Libellé"];
  const lat = data["Latitude"];
  const lng = data["Longitude"];

  const popup = L.popup().setContent(
    `<b>${name}</b><br>
    ${lat}, ${lng}`
  );

  if (lat === undefined || lng === undefined) {
    return;
  }

  L.marker([lat, lng]).addTo(map).bindPopup(popup).openPopup();
}

// Get info on this clicked circle
function onMapClick(e) {
  if (clickedMarker) {
    map.removeLayer(clickedMarker);
  }
  console.log("You clicked the map at " + e.latlng);
}

map.eachLayer(function (layer) {
  layer.on("click", onMapClick);
});

// API Calls
let direction = new Openrouteservice.Directions({ api_key: apiKey });

try {
  let response = await direction.calculate({
    coordinates: [
      [6.6392, 46.5895],
      [6.611, 46.591],
    ],
    profile: "cycling-regular",
    format: "json",
  });
  // console.log("response: ", response.routes[0]);
} catch (err) {
  console.log("An error occurred: " + err.status);
  console.error(await err.response.json());
}
