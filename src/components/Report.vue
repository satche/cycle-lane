<template>
	<div id="report"
		  @click.stop>

		<h2 class="title">🔖 Rapport</h2>

		<section class="report_section">

			<h3 class="title">Piste cyclable</h3>

			<div class="editableFields">
				<InputField label="Longueur (mètres)"
								id="routeLength"
								type="number"
								v-model="routeLength"
								@input="refreshReport"
								:min="0" />

				<InputField label="Largeur (mètres)"
								id="routeWidth"
								type="number"
								v-model="routeWidth"
								@input="refreshReport"
								:min="0" />
			</div>


			<div class="informationFields">

				<InfoField label="Volume de béton (m³)"
							  :value="routeVolume"
							  :text="`Calculé avec une épaisseur de ${routeTickness} mètres`" />

				<InfoField label="Quantité de béton (kg)"
							  :value="materialQuantity"
							  :text="`Calculé avec une masse volumique de ${materialVolumeMass} kg/m³`" />

				<InfoField label="CO2 émis (kg)"
							  :value="coQuantity"
							  :text="`Calculé avec un impact de ${materialImpact} kg de CO2 par kg de béton`" />

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
			materialVolumeMass: 2350,
			materialImpact: 0.109,
			routeVolume: 0,
			materialQuantity: 0,
			coQuantity: 0,
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
			this.calculateMaterialQuantity();
			this.calculateCO2();
		},
		calculateVolume() {
			this.routeVolume = Math.floor(this.routeLength * this.routeWidth * this.routeTickness * 100) / 100;
		},
		calculateMaterialQuantity() {
			this.materialQuantity = Math.floor(this.routeVolume * this.materialVolumeMass * 100) / 100;
		},
		calculateCO2() {
			this.coQuantity = Math.floor(this.materialQuantity * this.materialImpact / 40 * 100) / 100;
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