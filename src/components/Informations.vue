<script>
export default {
	/********************************
	 * Settings
	 ********************************/
	props: {
		mapData: Object,
	},

	// data() {
	// 	return {
	// 		startMarker: null,
	// 		endMarker: null,
	// 		route: null,
	// 		isOpen: true,
	// 	};
	// },

	/********************************
	 * Initialization
	 ********************************/
	watch: {
		'mapData.startMarker': {
			handler: function (newVal, oldVal) {
				console.log('startMarker changed:', newVal);
			},
			// deep: true,
		},
		'mapData.endMarker': {
			handler: function (newVal, oldVal) {
				console.log('endMarker changed:', newVal);
			},
		},
		'mapData.route': {
			handler: function (newVal, oldVal) {
				console.log('route changed:', newVal);
			},
		}
	},
};
</script>

<template>
	<section id="informations"
				:class="{ isOpen: mapData.startMarker !== null }">
		<div id="start-marker"
			  class="marker"
			  v-if="mapData.startMarker">
			<h2 class="title">{{ mapData.startMarker.options.title }}</h2>
		</div>
		<div id="end-marker"
			  class="marker"
			  v-if="mapData.endMarker">
			<h2 class="title">{{ mapData.endMarker.options.title }}</h2>
		</div>
	</section>
</template>

<style scoped>
#informations {
	position: absolute;
	top: 0;
	right: 0;
	width: 33vw;
	height: 100vh;
	z-index: 1000;
	background: white;
	transform: translateX(100%);
	transition: transform 0.3s ease-out;
}

#informations.isOpen {
	transform: translateX(0);
}
</style>