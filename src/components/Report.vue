<template>
	<Transition>
		<section id="report"
					@click="this.$emit('close-report')">

			<div class="content"
				  @click.stop>
				<strong class="title">Rapport</strong>
				<div>
					<label for="routeLength">Longueur du tracé (mètres):</label>
					<input type="number"
							 v-model="data.routeLength"
							 @input="refreshReport">
				</div>
				<div>
					<label for="routeWidth">Largeur du tracé (mètres):</label>
					<input type="number"
							 v-model="data.routeWidth"
							 @input="refreshReport">
				</div>
				<div>
					<label for="routeTickness">Epaisseur du tracé (mètres):</label>
					<input type="number"
							 v-model="data.routeTickness"
							 @input="refreshReport">
				</div>


				<div><strong>Volume:</strong> {{ routeVolume }} m³</div>
				<div><strong>Quantité de matériau:</strong> {{ materialQuantity }} kg</div>
				<div><strong>CO2 émis:</strong> {{ quantity }} kg</div>
			</div>


		</section>
	</Transition>
</template>


<script>
export default {
	props: {
		data: Object,
	},

	data() {
		return {
			materialVolumeMass: 2.5,
			materialImpact: 0.5,
			routeVolume: 0,
			materialQuantity: 0,
			quantity: 0,
		};
	},

	methods: {
		refreshReport() {
			this.data.routeVolume = this.calculateVolume();
			this.data.materialQuantity = this.calculateMaterialQuantity();
			this.co2Quantity = this.calculateCO2();
		},
		calculateVolume() {
			this.routeVolume = Math.floor(this.data.routeLength * this.data.routeWidth * this.data.routeTickness * 100) / 100;
		},
		calculateMaterialQuantity() {
			this.materialQuantity = Math.floor(this.routeVolume * this.materialVolumeMass * 100) / 100;
		},
		calculateCO2() {
			this.quantity = Math.floor(this.materialQuantity * this.materialImpact * 100) / 100;
			console.log(this.quantity);
		}
	},
};
</script>

<style>
#report {
	z-index: 1100;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.25);

	& .content {
		padding: 20px;
		background: white;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		border-radius: 5px;
	}
}

.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>