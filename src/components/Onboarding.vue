<template>
	<div>
		<h1>Bienvenue sur GreenTrack! ☀️🚴🏻</h1>
		<p>GreenTrack est une application web qui vous aide à analyser s'il est pertinent de construire des
			infrastructures de <strong>panneaux solaires</strong> sur des pistes cyclables choisies.
			Sélectionnez 2 villages/villes différents sur la carte pour créer un itinéraire cyclable entre eux, puis
			<strong>générez un rapport.</strong>
		</p>

		<p>Pour le moment, nos recherches ne se sont étendues qu'aux villages du canton de Vaud.
			Vous pouvez trouver le code source de l'application à l'adresse suivante:
			<a href="https://github.com/satche/green-track"
				target="_blank"
				rel="noopener">https://github.com/satche/green-track</a>
		</p>

		<p><strong>Légende des marqueurs</strong></p>

		<ul class="marker-legend">
			<li>
				<img src="@/assets/icons/marker-red.svg"
					  alt="Red marker" />
				Village avec gare ferroviaire
			</li>
			<li>
				<img src="@/assets/icons/marker-blue.svg"
					  alt="Blue marker">
				Village sans gare ferroviaire
			</li>
			<li>
				<img src="@/assets/icons/marker-purple.svg"
					  alt="Purple marker">
				Ville
			</li>
			<li>
				<img src="@/assets/icons/marker-gray.svg"
					  alt="Gray marker">
				Zone montagneuse
			</li>
		</ul>

		<button @click="close"
				  class="btn">Fermer</button>
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

@media (max-width: 768px) {
	h1 {
		margin-top: 50px;
		font-size: 1.2rem;
	}
}
</style>