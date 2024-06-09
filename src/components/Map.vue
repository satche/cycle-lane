<template>
	<section id="map"
				ref="map"></section>
</template>

<script>
import L from "leaflet";
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

		// Useful list of tile providers:
		// https://leaflet-extras.github.io/leaflet-providers/preview/
		L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
			maxZoom: 22
		}).addTo(this.map);


		// Fetch marker data
		let response = await fetch("./data.json");
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
				energy: data["Energie solaire"],
				cluster: data["Cluster"],

			}

			if (markerData.lat === undefined || markerData.lng === undefined) {
				return;
			}

			// Define marker's color according to cluster

			let colors = [
				"#e61038", // Train stations (red)
				"#4ab4d5", // Rural areas (blue)
				"#717e94", // Mountain areas (gray)
				"#8f61ae" // City centers (purple)
			];

			let strokeColors = [
				"#9f2a2a", // Train stations (red)
				"#306490", // Rural areas (blue)
				"#494949", // Mountain areas (gray)
				"#74196f" // City centers (purple)
			];

			let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
				<path fill="${colors[markerData.cluster]}" stroke="${strokeColors[markerData.cluster]}" stroke-width="1" d="M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m0 10q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22"/>
			</svg>`;

			// Add marker to map
			let icon = L.divIcon({
				html: svg,
				iconSize: [24, 24],
				iconAnchor: [12, 24],
			});

			L.marker([markerData.lat, markerData.lng], {
				...markerData,
				icon: icon,
				riseOnHover: true,
			})
				.addTo(this.map)
				.on("click", this.onMarkerClick);
		},

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

		selectThisMarker(marker) {

			let lat = marker.getLatLng().lat;
			let lng = marker.getLatLng().lng;
			let offset = 0.08;

			marker.setOpacity(1);
			if (this.startMarker && this.endMarker) {
				this.map.fitBounds([this.startMarker.getLatLng(), this.endMarker.getLatLng()]);
				return;
			}
			this.map.setView([lat, lng + offset], 12);
		},

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

		async calculateRoute() {
			if (this.startMarker == undefined || this.endMarker == undefined) {
				return;
			}

			const response = await this.direction
				.calculate({
					coordinates: [
						[this.startMarker.getLatLng().lng,
						this.startMarker.getLatLng().lat],
						[this.endMarker.getLatLng().lng,
						this.endMarker.getLatLng().lat],
					],
					profile: "cycling-regular",
					elevation: "true",
					format: "geojson",
				})
				.catch(error => {
					console.error(error);
				});

			this.route = response;
			const averageIrradiation = (this.startMarker.options.energy + this.endMarker.options.energy) / 2;
			this.$emit('update-map-data', {
				route: this.route,
				irradiation: averageIrradiation
			})
		},

		displayRoute() {
			if (this.route == undefined) {
				return;
			}

			let line = L.geoJSON(this.route.features[0].geometry, {
				style: {
					color: "#ff0066",
					weight: 4,
					opacity: 0.6,
				},
			});

			line.addTo(this.map);
		}
	}
};
</script>

<style>
#map {
	height: 100vh;
}

.leaflet-div-icon {
	margin: 0;
	background: none;
	border: 0;
}
</style>