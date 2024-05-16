<script>
import L from "leaflet";
import Papa from "papaparse";
import Openrouteservice from "openrouteservice-js";

const apiKey = import.meta.env.VITE_API_KEY;

export default {

	/********************************
	 * Settings
	 ********************************/
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

	/********************************
	 * Initialization
	 ********************************/
	async mounted() {
		this.direction = new Openrouteservice.Directions({ api_key: apiKey })

		let response = await fetch("./data/Data_communes_28features.csv");
		this.file = await response.text();

		this.map = L.map(this.$refs.map, {
			center: [46.519962, 6.633597], // Centered on Lausanne, VD
			zoom: 14,
		});

		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
		}).addTo(this.map);

		Papa.parse(this.file, {
			header: true,
			worker: true, // Don't bog down the main thread if its a big file
			step: (result) => {
				this.displayMarkerOnMap(result.data);
			},
		});
	},

	/********************************
	 * Methods
	 ********************************/
	methods: {

		/* Display marker on map
		 ********************************/
		displayMarkerOnMap(data) {
			let name = data["Libellé"];
			let lat = data["Latitude"];
			let lng = data["Longitude"];

			if (lat === undefined || lng === undefined) {
				return;
			}

			// Add marker to map
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
			this.map.eachLayer((layer) => {
				if (layer instanceof L.Marker) {
					layer.setOpacity(0.5);
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