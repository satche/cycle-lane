<template>
	<div class="detailMarker">
		<div class="detailMarker-title">{{ this.data.title }}</div>
		<InputField label="Population"
						id="population"
						unit=""
						v-model="population"
						@change="updateData"
						:min="1" />

		<InputField label="TJM max."
						id="maxAverageDailyTraffic"
						unit=""
						v-model="maxAverageDailyTraffic"
						@change="updateData"
						:min="this.limit"
						:tooltip="`Trafic Journalier Moyen maximum`" />

		<InputField label="Nbr. pistes cyclables"
						id="cycleLaneNumber"
						unit=""
						v-model="cycleLaneNumber"
						@change="updateData"
						:min="1"
						/>

		<InputField label="Nbr. routes"
						id="roadNumber"
						unit=""
						v-model="roadNumber"
						@change="updateData"
						:min="1"
						:tooltip="`Comprend le nombre de routes incluses dans le calcul du TJM`" />
	</div>
</template>

<script>

import InputField from "@/components/ui/InputField.vue";

export default {
	components: {
		InputField,
	},
	props: {
		markerId: {
			type: String,
			required: true,
		},
		data: {
			type: Object,
			required: true,
		},
		limit: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			population: this.data.population,
			maxAverageDailyTraffic: this.data.maxAverageDailyTraffic,
			cycleLaneNumber: this.data.cycleLaneNumber,
			roadNumber: this.data.roadNumber,
		};
	},
	methods: {
		updateData() {
			this.$emit("detail-marker-update", {
				markerId: this.markerId,
				data: {
					title: this.data.title,
					population: this.population,
					maxAverageDailyTraffic: this.maxAverageDailyTraffic,
					cycleLaneNumber: this.cycleLaneNumber,
					roadNumber: this.roadNumber
				}
			});
		},
	}
};

</script>

<style scoped>
.detailMarker-title {
	font-weight: bold;
	margin-bottom: 0.5em;
}
</style>