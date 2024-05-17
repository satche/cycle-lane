<script>
import L from "leaflet";
import Papa from "papaparse";
import Openrouteservice from "openrouteservice-js";

const apiKey = import.meta.env.VITE_API_KEY;

export default {

	data() {
		return {
			map: null,
			startMarker: null,
			endMarker: null,
			route: null,
			data: null,
			api: null,
		};
	},


	/**
	 * Initialize the map and fetch the marker data
	 * Display each marker on the map
	 */
	async mounted() {
		// Init API
		this.direction = new Openrouteservice.Directions({ api_key: apiKey })

		// Init map
		this.map = L.map(this.$refs.map, {
			center: [46.569962, 6.733597], // Centered on Vaud, Switzerland
			zoom: 10,
		});

		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
		}).addTo(this.map);

		// Fetch marker data
		let response = await fetch("./data/Data_villages_vaud.json");
		this.data = await response.json();

		// Display each marker on the map
		this.data.forEach((data) => {
			this.displayMarkerOnMap(data);
		});
	},

	methods: {

		/**
		 * Display a marker on the map with latitude and longitude coordinates
		 * Include additional data in the object
		 * @param {data} data JSON data containing the markers informations
		 */
		displayMarkerOnMap(data) {
			let markerData = {
				name: data["Nom"],
				lat: data["Latitude"],
				lng: data["Longitude"],
				population: data["Population"],
				energy: data["Energie solaire"]
			}

			if (markerData.lat === undefined || markerData.lng === undefined) {
				return;
			}

			// Add marker to map
			let icon = L.icon({
				iconSize: [35, 35],
				iconUrl:
					"https://api.iconify.design/material-symbols:location-on.svg?color=%23000000",
			});

			L.marker([markerData.lat, markerData.lng], {
				...markerData,
				icon: icon,
				riseOnHover: true,
			})
				.addTo(this.map)
				.on("click", this.onMarkerClick);
		},

		/* Marker click event
		 ********************************/
		onMarkerClick(e) {

			// Set start marker
			if (this.startMarker == undefined) {
				this.unselectAllMarkers();
				this.selectThisMarker(e.target);
				this.startMarker = e.target;
				this.$emit('update-map-data', {
					startMarker: this.startMarker
				})
				return;
			}

			// Set end marker
			if (this.endMarker == undefined) {
				this.selectThisMarker(e.target);
				this.endMarker = e.target;
				this.calculateRoute().then(route => {
					this.displayRoute(route);
				});
				this.$emit('update-map-data', {
					endMarker: this.endMarker,
				})
				return;
			}

			// Both markers are set
			this.unselectAllMarkers();
			this.selectThisMarker(e.target);
			this.startMarker = e.target;
			this.$emit('update-map-data', {
				startMarker: this.startMarker,
				endMarker: this.endMarker,
				route: this.route
			})
		},

		/* Marker select
		 ********************************/
		selectThisMarker(marker) {
			marker.setOpacity(1);
		},

		/* Unselect all markers
		 ********************************/
		unselectAllMarkers() {
			this.startMarker = undefined;
			this.endMarker = undefined;
			this.route = undefined;
			this.map.eachLayer((layer) => {
				if (layer instanceof L.Marker) {
					layer.setOpacity(0.3);
				}
				if (layer instanceof L.Polyline) {
					this.map.removeLayer(layer);
				}
			});
		},

		/* Calculate route
		 ********************************/
		async calculateRoute() {
			if (this.startMarker == undefined || this.endMarker == undefined) {
				return;
			}

			const response = await this.direction
				.calculate({
					coordinates: [
						[this.startMarker.getLatLng().lng, this.startMarker.getLatLng().lat],
						[this.endMarker.getLatLng().lng, this.endMarker.getLatLng().lat],
					],
					profile: "cycling-regular",
					format: "geojson",
				})
				.catch(error => {
					console.error(error);
				});

			this.route = response;
			this.$emit('update-map-data', {
				route: this.route
			})
		},

		/* Display route
			 ********************************/
		displayRoute() {
			if (this.route == undefined) {
				return;
			}

			let line = L.geoJSON(this.route.features[0].geometry, {
				style: {
					color: "blue",
					weight: 5,
					opacity: 0.7,
				},
			});

			line.addTo(this.map);
		}
	}
};
</script>

<template>
	<section id="map"
				ref="map"></section>
</template>

<style scoped>
#map {
	height: 100vh;
}
</style>