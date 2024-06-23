<script setup>
import { defineProps } from 'vue';

const props = defineProps({
	data: Object,
});
</script>

<template>
	<div class="marker">
		<div class="marker_content"
			  v-if="data">
			<div class="title">{{ data.options.name }}</div>
			<div class="marker_coordinates">
				{{ data.options.lng }}, {{ data.options.lat }}
			</div>
			<ul class="marker_infoList">
				<li class="marker_population">
					<strong>Population:</strong> {{ data.options.population }} hab.
				</li>
				<li class="marker_energy">
					<strong>Energie:</strong> {{ data.options.energy }} kWh
				</li>
			</ul>
		</div>

		<div v-else>
			<div>Sélectionnez un point sur la carte</div>
		</div>
	</div>
</template>

<style scoped>
.marker {
	width: 50%;
}

.marker_coordinates {
	font-size: 0.8rem;
	color: #919191;
}

.marker_infoList {
	font-size: 0.9rem;
	list-style-type: none;
	padding: 0;
}

.marker_population {
	&::before {
		content: "👥";
		margin-right: 0.5rem;
	}
}

.marker_energy {
	&::before {
		content: "☀️";
		margin-right: 0.5rem;
	}
}

@media (max-width: 768px) {
	.marker_infoList {
		font-size: 0.8rem;
		margin: 5px 0;
	}
}
</style>