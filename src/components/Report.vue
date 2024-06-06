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
							  :value="concreteCoQuantity"
							  unit="kg"
							  :tooltip="`Calculé avec un impact de ${concreteImpact} kg de CO2 par kg de béton`" />

			</div>

		</section>

		<section class="report_section">

			<h3 class="title">Structure en bois</h3>



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
			concreteCoQuantity: 0,
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
			this.concreteCoQuantity = Math.floor(this.concreteQuantity * this.concreteImpact / 40 * 100) / 100;
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