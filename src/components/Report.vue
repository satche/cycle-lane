<template>
   <div id="report"
        @click.stop>
      <h2 class="title">🔖 Rapport</h2>
      <div class="report_container">

         <section class="report_section">
            <div class="report_field">
               <h3 class="title">🚴🏻 Route cyclable</h3>

               <div class="inputFields">
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
            </div>

            <div class="report_field">
               <h3 class="title">🧱 Structure</h3>

               <div class="informationFields">
                  <InfoField label="CO2 émis par le bois"
                             :value="woodCo2Quantity"
                             unit="kg/an"
                             :tooltip="`Calculé avec un impact de ${woodImpact} kg de CO2 par mètre de tracé sur ${woodLifespan} ans`" />
               </div>

               <div class="informationFields">
                  <InfoField label="CO2 émis par le béton"
                             :value="concreteStructureCo2Quantity"
                             unit="kg/an"
                             :tooltip="`Calculé avec un impact de ${concreteStructureImpact} kg de CO2 par mètre de tracé sur ${concreteLifespan} ans`" />
               </div>
            </div>

            <div class="report_field">
               <h3 class="title">☀️ Production solaire</h3>

               <div class="inputFields">
                  <InputField label="Irradiation moyenne"
                              id="irradiation"
                              type="number"
                              unit="kWh/m²/an"
                              v-model="irradiation"
                              @input="refreshReport"
                              :min="0" />
               </div>

               <div class="informationFields">
                  <InfoField label="Production solaire"
                             :value="solarPanelProduction"
                             unit="kWh/an"
                             :tooltip="`La route peut compter en largeur ${solarPannelNumberOnRouteWidth} panneaux solaires de ${solarPanelSurface} m² chacun, avec un rendement de ${solarPanelEfficiency} et une efficacité de la chaîne de ${chainEfficiency}`" />

                  <InfoField label="Impact énergie solaire"
                             :value="solarCo2Quantity"
                             unit="kg/an"
                             :tooltip="`Calculé avec un impact de ${solarCo2Impact} kg de CO2 par kWh produit`" />

                  <p>La production solaire pourrait alimenter
                     <Tooltip :text="`Calculé sur une base de ${energyProHouse} kWh/an/foyer`">
                        {{ (solarPanelProduction / energyProHouse).toFixed(2) }}
                     </Tooltip>
                     foyers.
                  </p>
               </div>
            </div>

            <div class="report_field">
               <h3 class="title">💨 Impact total</h3>
               <div class="informationFields">
                  <InfoField label="CO2 total"
                             :value="totalCo2Quantity"
                             unit="kg/an"
                             :tooltip="`CO2 émis par la route en une année`" />
               </div>
            </div>

         </section>

         <section class="report_section">

            <div class="report_field">
               <h3 class="title">🚗 Route voiture</h3>

               <div class="inputFields">
                  <InputField label="Quantité CO2 émise par voiture"
                              id="carCo2Impact"
                              type="number"
                              unit="kg/km"
                              v-model="carCo2Impact"
                              @input="refreshReport"
                              :step="0.01"
                              :min="0" />

                  <InputField label="Distance parcourue par voiture"
                              id="carDistance"
                              type="number"
                              unit="m."
                              v-model="carDistance"
                              @input="refreshReport"
                              :min="0" />
               </div>

               <div class="infoFields">
                  <InfoField label="CO2 émis par les voitures"
                             :value="carCo2Quantity"
                             unit="kg/an"
                             :tooltip="`Calculé sur ${workingDays} jours de travail par an`" />

                  <p>Il faudrait environ {{ (totalCo2Quantity / carCo2Quantity).toFixed(2) }} voitures pour
                     compenser
                     l'impact total de CO2</p>

               </div>

            </div>
         </section>

      </div>
   </div>
</template>


<script>
import Tooltip from './ui/Tooltip.vue';
import InputField from './ui/InputField.vue';
import InfoField from './ui/InfoField.vue';
import Openrouteservice from "openrouteservice-js";

const apiKey = import.meta.env.VITE_API_KEY;

export default {
   props: {
      data: Object,
   },

   data() {
      return {
         markersCoordinates: this.data.markersCoordinates,

         routeLength: this.data.routeLength,
         routeWidth: 3,
         routeTickness: 0.12,
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

         irradiation: this.data.irradiation,
         solarPanelSurface: 1.83,
         solarPanelEfficiency: 0.23,
         chainEfficiency: 0.83,

         solarPannelNumberOnRouteWidth: 4,
         solarPanelProduction: 0,
         solarCo2Impact: 0.037,
         solarCo2Quantity: 0,
         energyProHouse: 3000, // kWh / year

         totalCo2Quantity: 0,

         workingDays: 235,
         carDistance: 0, // m
         carCo2Impact: 0.133, // kg CO2 / km
         carCo2Quantity: 0,
      };
   },

   components: {
      Tooltip,
      InputField,
      InfoField,
   },

   async mounted() {
      await this.calculateCarDistance();
      this.refreshReport();
   },

   methods: {
      refreshReport() {
         this.calculateConcreteVolume();
         this.calculateConcreteQuantity();
         this.calculateSolarPannelProduction();
         this.calculateCO2();
      },
      calculateConcreteVolume() {
         this.routeVolume = this.routeLength * this.routeWidth * this.routeTickness;
      },
      calculateConcreteQuantity() {
         this.concreteQuantity = this.routeVolume * this.concreteVolumeMass;
      },
      calculateCO2() {
         this.concreteCo2Quantity = this.concreteQuantity * this.concreteImpact / 40;
         this.woodCo2Quantity = this.routeLength * this.woodImpact / this.woodLifespan;
         this.concreteStructureCo2Quantity = this.routeLength * this.concreteStructureImpact / this.concreteLifespan;
         this.solarCo2Quantity = this.solarPanelProduction * this.solarCo2Impact;

         this.totalCo2Quantity = this.concreteCo2Quantity + this.woodCo2Quantity + this.concreteStructureCo2Quantity + this.solarCo2Quantity;
         this.calculateCarCo2();
      },
      calculateSolarPannelProduction() {
         const solarPanelOnRouteLength = this.routeLength / 1.7;
         const solarPanelNumber = solarPanelOnRouteLength * this.solarPannelNumberOnRouteWidth;
         const solarPanelProduction = solarPanelNumber * this.solarPanelSurface * this.irradiation * this.solarPanelEfficiency * this.chainEfficiency;
         this.solarPanelProduction = solarPanelProduction;
      },
      calculateCarCo2() {
         const distanceProYear = (this.carDistance / 1000) * this.workingDays * 2; // in km, back and forth
         const carCo2 = this.carCo2Impact * distanceProYear;

         this.carCo2Quantity = carCo2;
      },
      async calculateCarDistance() {
         this.direction = new Openrouteservice.Directions({ api_key: apiKey })
         const response = await this.direction
            .calculate({
               coordinates: [
                  this.markersCoordinates[0], this.markersCoordinates[1]
               ],
               profile: "driving-car",
               format: "geojson",
            })
            .catch(error => {
               console.error(error);
            });
         this.carDistance = response.features[0].properties.summary.distance;
      }
   },
};

</script>

<style scoped>
.report_container {
   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-gap: 5rem;
   width: 100%;
}

.report_section {
   position: relative;
}

.report_section:after {
   content: '';
   border-right: 1px solid #ccc;
   height: 100%;
   position: absolute;
   top: 0;
   right: -2.5rem;

}

.title {
   font-size: 1.3rem;
   margin: 0;
   margin-bottom: 1rem;
}

.report_field {

   display: flex;
   flex-direction: column;

   & .title {
      font-size: 1.1rem;
      margin: 0;
      margin-bottom: 0.5rem;
   }

   & .inputFields,
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