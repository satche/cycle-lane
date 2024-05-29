<script>

export default {
	props: {
		data: Object,
	},

	computed: {
		formattedDuration() {
			if (!this.data) return '';
			let durationInMinutes = this.data.features[0].properties.summary.duration / 60;
			let hours = Math.floor(durationInMinutes / 60);
			let minutes = Math.round(durationInMinutes % 60);
			return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
		},

		formattedDistance() {
			if (!this.data) return '';
			let distance = this.data.features[0].properties.summary.distance;
			let distanceInKm = distance / 1000;
			let distanceRounded = Math.floor(distanceInKm * 100) / 100;
			return `${distanceRounded}km`;
		},
	},
};
</script>

<template>
	<div id="route"
		  v-if="data">
		<div class="title">Route</div>
		<ul class="route_infos">
			<li class="route_minutes">
				<strong>Durée:</strong> {{ formattedDuration }}
			</li>
			<li class="route_distance">
				<strong>Distance:</strong> {{ formattedDistance }}
			</li>
			<li class="route_ascent">
				<strong>Ascension:</strong> {{ data.features[0].properties.ascent }}m
			</li>
			<li class="route_descent">
				<strong>Descente:</strong> {{ data.features[0].properties.descent }}m
			</li>
			<li class="route_steepness">
				<strong>Pente:</strong>
				<ul class="route_steepness_list"
					 v-for="step in data.features[0].properties.extras.steepness.summary">
					<li>{{ step.distance }}m ({{ step.amount }}%)</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<style scoped>
#route {
	margin-top: 25px;
}

.route_infos {
	list-style-type: none;
	padding: 0;
}

.route_distance {
	&::before {
		content: "📏";
		margin-right: 0.5rem;
	}
}

.route_minutes {
	&::before {
		content: "⏱";
		margin-right: 0.5rem;
	}
}

.route_ascent {
	&::before {
		content: "⬆️";
		margin-right: 0.5rem;
	}
}

.route_descent {
	&::before {
		content: "⬇️";
		margin-right: 0.5rem;
	}
}

.route_steepness {
	&::before {
		content: "📈";
		margin-right: 0.5rem;
	}
}
</style>