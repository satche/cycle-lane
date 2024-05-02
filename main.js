import Openrouteservice from "openrouteservice-js";
import L from "leaflet";
import Papa from "papaparse";

/********************************
 * Settings
 ********************************/
const apiKey = import.meta.env.VITE_API_KEY;

let response = await fetch("/Data_communes_28features.csv");
let file = await response.text();

let startMarker, endMarker;

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

  if (lat === undefined || lng === undefined) {
    return;
  }

  let icon = L.icon({
    iconSize: [35, 35],
    iconUrl:
      "https://api.iconify.design/material-symbols:location-on.svg?color=%23000000",
  });

  L.marker([lat, lng], {
    title: name,
    icon: icon,
    riseOnHover: true,
  })
    .addTo(map)
    .on("click", onMarkerClick);
}

function onMarkerClick(e) {
  // Set start marker
  if (startMarker == undefined) {
    unselectAllMarkers();
    selectThisMarker(e.target);
    startMarker = e.target;
    return;
  }

  // Set end marker
  if (endMarker == undefined) {
    selectThisMarker(e.target);
    endMarker = e.target;
    calculateRoute().then(route => {
      displayRoute(route);
    });
    return;
  }

  // Both markers are set
  unselectAllMarkers();
  selectThisMarker(e.target);
  startMarker = e.target;
}

function selectThisMarker(marker) {
  marker.setOpacity(1);
}

function unselectAllMarkers() {
  startMarker = undefined;
  endMarker = undefined;
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      layer.setOpacity(0.5);
    }
    if (layer instanceof L.Polyline) {
      map.removeLayer(layer);
    }
  });
}

/********************************
 * Calculate route
 ********************************/
let direction = new Openrouteservice.Directions({ api_key: apiKey });

async function calculateRoute() {
  if (startMarker == undefined || endMarker == undefined) {
    return;
  }

  const response = await direction
    .calculate({
      coordinates: [
        [startMarker.getLatLng().lng, startMarker.getLatLng().lat],
        [endMarker.getLatLng().lng, endMarker.getLatLng().lat],
      ],
      profile: "cycling-regular",
      format: "geojson",
    })
    .catch(error => {
      console.error(error);
    });

  return response;
}

/********************************
 * Display route
 ********************************/
function displayRoute(route) {
  if (route == undefined) {
    return;
  }
  console.log(route);

  let line = L.geoJSON(route.features[0].geometry, {
    style: {
      color: "blue",
      weight: 5,
      opacity: 0.7,
    },
  });

  line.addTo(map);
}
