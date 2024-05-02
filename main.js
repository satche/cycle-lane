import Openrouteservice from "openrouteservice-js";
import L from "leaflet";
import Papa from "papaparse";
import env from "./.env";

/********************************
 * Settings
 ********************************/
const apiKey = env.API_KEY;

/********************************
 * Map Initialization
 ********************************/
const mapNodeDOM = document.getElementById("map");

let map = L.map(mapNodeDOM, {
  center: [46.519962, 6.633597], // Centered on Lausanne, VD
  zoom: 14,
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

/********************************
 * CSV Parsing
 ********************************/
let response = await fetch("/Data_communes_28features.csv");
let file = await response.text();

Papa.parse(file, {
  header: true,
  worker: true, // Don't bog down the main thread if its a big file
  step: function (result) {
    displayMarkerOnMap(result.data);
  },
});

/********************************
 * Marker Display
 ********************************/
function displayMarkerOnMap(data) {
  let name = data["Libellé"];
  let lat = data["Latitude"];
  let lng = data["Longitude"];

  let popup = L.popup().setContent(
    `<b>${name}</b><br>
    ${lat}, ${lng}`
  );

  if (lat === undefined || lng === undefined) {
    return;
  }

  let icon = L.icon({
    iconSize: 35,
    iconUrl:
      "https://api.iconify.design/material-symbols:location-on.svg?color=%23000000",
  });

  L.marker([lat, lng], {
    title: name,
    icon: icon,
    riseOnHover: true,
  })
    .addTo(map)
    .bindPopup(popup)
    .openPopup();
}

/********************************
 * API calls
 ********************************/
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
