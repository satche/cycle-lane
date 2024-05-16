<script>

export default {
	/********************************
	 * Settings
	 ********************************/
	props: {
		data: Object,
	},

	/********************************
	 * Initialization
	 ********************************/
	watch: {
		'data.startMarker': {
			handler: function (newVal, oldVal) {
				console.log('startMarker changed:', newVal);
			},
			// deep: true,
		},
		'data.endMarker': {
			handler: function (newVal, oldVal) {
				console.log('endMarker changed:', newVal);
			},
		},
		'data.route': {
			handler: function (newVal, oldVal) {
				console.log('route changed:', newVal);
			},
		}
	},
};
</script>

<template>
	<section id="informations"
				:class="{ isOpen: data.startMarker !== null }">

		<div id="start-marker"
			  class="marker"
			  v-if="data.startMarker">
			<h2 class="title">{{ data.startMarker.options.name }}</h2>
			<p>{{ data.startMarker.options.lat }} {{ data.startMarker.options.lng }}</p>
			<ul>
				<li>
					Population: {{ data.startMarker.options.population }}
				</li>
				<li>
					Energie solaire: {{ data.startMarker.options.energy }}
				</li>
			</ul>
		</div>

		<div id="end-marker"
			  class="marker"
			  v-if="data.endMarker">
			<h2 class="title">{{ data.endMarker.options.name }}</h2>
			<p>{{ data.endMarker.options.lat }} {{ data.endMarker.options.lng }}</p>
			<ul>
				<li>
					Population: {{ data.endMarker.options.population }}
				</li>
				<li>
					Energie solaire: {{ data.endMarker.options.energy }}
				</li>
			</ul>
		</div>

		<div id="route">
			<h2 class="title">Route</h2>
			<ul>
				<li v-if="data.route">Distance: {{ data.route.features[0].properties.summary.distance }} mètres</li>
				<li v-if="data.route">Durée: {{ data.route.features[0].properties.summary.duration / 60 }} minutes</li>
			</ul>
		</div>

	</section>
</template>

<style scoped>
#informations {
	position: absolute;
	top: 0;
	right: 0;
	width: 500px;
	height: 100vh;
	padding: 20px;
	z-index: 1000;
	background: white;
	transform: translateX(100%);
	transition: transform 0.3s ease-out;
}

@media (max-width: 768px) {
	#informations {
		top: auto;
		bottom: 0;
		width: 100vw;
		height: 50vh;
	}
}

#informations.isOpen {
	transform: translateX(0);
}
</style>