<template>
	<div>
		<h1>Welcome to GreenTrack! ☀️🚴🏻</h1>
		<p>GreenTrack is a web app to help you analyze if it's relevant to build <strong>solar panel</strong>
			infrastructures on top of chosen cycle lanes. Select 2 differents village/city on the map to create a cycle
			route between them, then <strong>generate a report.</strong></p>

		<p><strong>Marker Legend</strong></p>

		<ul class="marker-legend">
			<li>
				<img src="@/assets/icons/marker-red.svg"
					  alt="Red marker" />
				Rural village with train station
			</li>
			<li>
				<img src="@/assets/icons/marker-blue.svg"
					  alt="Blue marker">
				Rural village without train station
			</li>
			<li>
				<img src="@/assets/icons/marker-purple.svg"
					  alt="Purple marker">
				City
			</li>
			<li>
				<img src="@/assets/icons/marker-gray.svg"
					  alt="Gray marker">
				Mountain area
			</li>
		</ul>

		<button @click="close"
				  class="btn">Close</button>
	</div>
</template>

<script setup>

import { defineEmits } from 'vue';

const emit = defineEmits(['close'])
const close = () => emit('close');

</script>

<style scoped>
h1 {
	font-size: 1.5rem;
	margin-bottom: 1rem;
}

.marker-legend {
	display: flex;
	flex-direction: column;
	list-style: none;
	margin: 0;
	padding: 0;
	margin-bottom: 25px;

	& img {
		width: 25px;
		margin-right: 7px;
	}
}

.marker-legend li {
	display: flex;
	align-items: center;
	margin-bottom: 5px;
}
</style>