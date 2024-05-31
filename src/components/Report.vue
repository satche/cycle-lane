<template>
	<div class="report"
		  @click.stop>
		<strong class="title">Rapport</strong>

		<div>
			<label for="routeLength">Longueur du tracé (mètres):</label>
			<input type="number"
					 v-model="data.routeLength"
					 @input="refreshReport"
					 :min="0">
		</div>
		<div>
			<label for="routeWidth">Largeur du tracé (mètres):</label>
			<input type="number"
					 v-model="data.routeWidth"
					 @input="refreshReport"
					 :min="0">
		</div>

		<div><strong>Volume:</strong> {{ routeVolume }} m³</div>
		<div><strong>Quantité de matériau:</strong> {{ materialQuantity }} kg</div>
		<div><strong>CO2 émis:</strong> {{ coQuantity }} kg</div>
	</div>

</template>


<script>
export default {
	props: {
		data: Object,
	},

	data() {
		return {
			materialVolumeMass: 2350,
			materialImpact: 0.109,
			routeVolume: 0,
			materialQuantity: 0,
			coQuantity: 0,
		};
	},

	mounted() {
		this.refreshReport();
	},

	methods: {
		refreshReport() {
			this.calculateVolume();
			this.calculateMaterialQuantity();
			this.calculateCO2();
		},
		calculateVolume() {
			this.routeVolume = Math.floor(this.data.routeLength * this.data.routeWidth * this.data.routeTickness * 100) / 100;
		},
		calculateMaterialQuantity() {
			this.materialQuantity = Math.floor(this.routeVolume * this.materialVolumeMass * 100) / 100;
		},
		calculateCO2() {
			this.coQuantity = Math.floor(this.materialQuantity * this.materialImpact * 100) / 100 / 40;
		}
	},
};
</script>