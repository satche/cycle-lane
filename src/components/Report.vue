<template>
	<div id="report"
		  @click.stop>

		<h2 class="title">🔖 Rapport</h2>

		<section class="report_section">

			<h3 class="title">Route béton</h3>

			<div class="editableFields">
				<InputField label="Longueur"
								id="routeLength"
								type="number"
								unit="m."
								v-model="routeLength"
								@input="refreshReport"
								:min="0" />

				<InputField label="Largeur"
								id="routeWidth"
								type="number"
								unit="m."
								v-model="routeWidth"
								@input="refreshReport"
								:min="0" />
			</div>


			<div class="informationFields">

				<InfoField label="Volume de béton"
							  :value="routeVolume"
							  unit="m³"
							  :tooltip="`Calculé avec une épaisseur de ${routeTickness} mètres`" />

				<InfoField label="Quantité de béton"
							  :value="concreteQuantity"
							  unit="kg"
							  :tooltip="`Calculé avec une masse volumique de ${concreteVolumeMass} kg/m³`" />

				<InfoField label="CO2 émis"
							  :value="concreteCo2Quantity"
							  unit="kg"
							  :tooltip="`Calculé avec un impact de ${concreteImpact} kg de CO2 par kg de béton`" />

			</div>

		</section>

		<section class="report_section">

			<h3 class="title">Structure en bois</h3>

			<div class="informationFields">

				<InfoField label="CO2 émis"
							  :value="woodCo2Quantity"
							  unit="kg/an"
							  :tooltip="`Calculé avec un impact de ${woodImpact} kg de CO2 par mètre de tracé`" />

			</div>

		</section>

		<section class="report_section">

			<h3 class="title">Structure en béton</h3>

			<div class="informationFields">

				<InfoField label="CO2 émis"
							  :value="concreteStructureCo2Quantity"
							  unit="kg/an"
							  :tooltip="`Calculé avec un impact de ${concreteStructureImpact} kg de CO2 par mètre de tracé`" />

			</div>
		</section>

	</div>

</template>


<script>
import Tooltip from './ui/Tooltip.vue';
import InputField from './ui/InputField.vue';
import InfoField from './ui/InfoField.vue';

export default {
	props: {
		data: Object,
	},

	data() {
		return {
			routeLength: this.data.routeLength,
			routeWidth: this.data.routeWidth,
			routeTickness: this.data.routeTickness,
			routeVolume: 0,

			concreteVolumeMass: 2350,
			concreteImpact: 0.109,
			concreteQuantity: 0,
			concreteCo2Quantity: 0,

			woodImpact: 0.504,
			woodLifespan: 40,
			woodCo2Quantity: 0,

			concreteStructureImpact: 40.984,
			concreteLifespan: 40,
			concreteStructureCo2Quantity: 0,
		};
	},

	components: {
		Tooltip,
		InputField,
		InfoField,
	},

	mounted() {
		this.refreshReport();
	},

	methods: {
		refreshReport() {
			this.calculateVolume();
			this.calculateconcreteQuantity();
			this.calculateCO2();
		},
		calculateVolume() {
			this.routeVolume = Math.floor(this.routeLength * this.routeWidth * this.routeTickness * 100) / 100;
		},
		calculateconcreteQuantity() {
			this.concreteQuantity = Math.floor(this.routeVolume * this.concreteVolumeMass * 100) / 100;
		},
		calculateCO2() {
			this.concreteCo2Quantity = Math.floor(this.concreteQuantity * this.concreteImpact / 40 * 100) / 100;
			this.woodCo2Quantity = Math.floor(this.routeLength * this.woodImpact / this.woodLifespan * 100) / 100;
		}
	},
};
</script>

<style scoped>
.title {
	font-size: 1.5rem;
	margin: 0;
	margin-bottom: 1rem;
}

.report_section {

	display: flex;
	flex-direction: column;

	& .title {
		font-size: 1.2rem;
		margin: 0;
		margin-bottom: 0.5rem;
	}

	& .editableFields,
	& .informationFields {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	& .informationField {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
	}
}
</style>