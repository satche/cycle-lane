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
                              unit="m."
                              v-model="routeLength"
                              @change="refreshReport"
                              :min="0" />
                  <InputField label="Largeur"
                              id="routeWidth"
                              unit="m."
                              v-model="routeWidth"
                              @change="refreshReport"
                              :min="0" />
                  <InputField label="Pente"
                              id="routeSteepness"
                              unit="%"
                              v-model="routeSteepness"
                              @change="refreshReport"
                              :step="0.1"
                              :rounded="1"
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
                  <InfoField label="CO2 émis pour la construction"
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
                              unit="kWh/m²/an"
                              v-model="irradiation"
                              @change="refreshReport"
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

                  <p>Grâce à la production solaire générée, il est possible d'alimenter environ
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
                  <InfoField label="Quantité de CO2 émis"
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
                  <InputField label="Longueur"
                              id="carDistance"
                              unit="m."
                              v-model="carDistance"
                              @change="refreshReport"
                              :min="0" />
                  <InputField label="Quantité CO2 par voiture"
                              id="carCo2Impact"
                              unit="kg/km"
                              v-model="carCo2Impact"
                              @change="refreshReport"
                              :step="0.001"
                              :rounded="3"
                              :min="0" />
               </div>

               <div class="infoFields">
                  <InfoField label="CO2 émis par les voitures"
                             :value="carCo2Quantity"
                             unit="kg/an"
                             :tooltip="`Calculé sur ${workingDays} jours de travail par an`" />

                  <p>Il faudrait environ
                     {{ (totalCo2Quantity / carCo2Quantity).toFixed(2) }}
                     voitures pour compenser l'impact total de CO2</p>
               </div>
            </div>

            <hr>

            <div class="report_field">
               <h3 class="title">💯 Scores</h3>

               <p>Le tronçon sélectionné est pertinent pour…</p>

               <div class="informationFields">
                  <InfoField label="Installer des panneaux solaires"
                             :value="solarScore"
                             unit="/5"
                             :rounded="1"
                             :tooltip="`Ce score se base sur l'énergie solaire annuelle et le nombre de foyers`" />
                  <InfoField label="Construire une piste cyclable"
                             :value="routeScore"
                             unit="/5"
                             :rounded="1"
                             :tooltip="`Ce score se base sur la longueur et la pente du tronçon`" />
                  <Accordion @toggle-detail="toggleDetail($event)">
                     <div class="info">
                        ℹ️ Si vous n'êtes pas sûr de quoi entrer dans ces champs, nous vous encourageons à récupérer
                        ces informations directement sur
                        <a href="https://www.geo.vd.ch/"
                           target="_blank"
                           rel="noopener">geo.vd.ch</a>
                     </div>
                     <InputField label="Fréquentation des transports publics"
                                 id="transportFrequency"
                                 unit="min./h."
                                 v-model="transportFrequency"
                                 @change="refreshReport"
                                 :min="0"
                                 :tooltip="`Fréquentation des bus/train sur le tronçon routier`" />

                     <InputField label="Trajets Journaliers Moyens (TJM)"
                                 id="averageDailyTraffic"
                                 unit="TJM"
                                 v-model="averageDailyTraffic"
                                 @change="refreshReport"
                                 :min="0"
                                 :tooltip="`Nombre de trajets allers-retours de véhicules, en moyenne, sur le tronçon routier`" />

                     <div class="detailMarkers">
                        <DetailMarker marker-id="village1"
                                      :data="village1"
                                      :limit="averageDailyTraffic"
                                      @detail-marker-update="detailMarkerUpdate" />
                        <div class="detailMarker-separator"></div>
                        <DetailMarker marker-id="village2"
                                      :data="village2"
                                      :limit="averageDailyTraffic"
                                      @detail-marker-update="detailMarkerUpdate" />
                     </div>
                  </Accordion>
               </div>

            </div>
         </section>

      </div>
   </div>
</template>


<script>
import Openrouteservice from "openrouteservice-js";
import Tooltip from '../ui/Tooltip.vue';
import InputField from '../ui/InputField.vue';
import InfoField from '../ui/InfoField.vue';
import Accordion from '../ui/Accordion.vue';
import DetailMarker from './DetailMarker.vue';

const apiKey = import.meta.env.VITE_API_KEY;

export default {
   components: {
      Tooltip,
      InputField,
      InfoField,
      Accordion,
      DetailMarker,
   },

   props: {
      data: Object,
   },

   data() {
      return {
         markers: this.data.markers,
         detailedEvaluation: false,

         routeLength: this.data.routeLength,
         routeWidth: 3,
         routeTickness: 0.12,
         routeVolume: 0,
         routeSteepness: this.data.routeSteepness,

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

         transportFrequency: 30,
         averageDailyTraffic: 4000,

         village1: {
            title: this.data.markers[0].options.name,
            population: this.data.markers[0].options.population,
            maxAverageDailyTraffic: 10000,
            cycleLaneNumber: 1,
            roadNumber: 2,
         },

         village2: {
            title: this.data.markers[1].options.name,
            population: this.data.markers[1].options.population,
            maxAverageDailyTraffic: 10000,
            cycleLaneNumber: 1,
            roadNumber: 2,
         },

         routeScore: 0,
         solarScore: 0,
      };
   },

   async mounted() {
      console.log(this.data);
      await this.calculateCarDistance();
      this.refreshReport();
   },

   methods: {
      toggleDetail(showDetail) {
         this.detailedEvaluation = showDetail;
         this.refreshReport();
      },
      refreshReport() {
         this.calculateConcreteVolume();
         this.calculateConcreteQuantity();
         this.calculateSolarPannelProduction();
         this.calculateCO2();
         this.evaluateRoute(this.detailedEvaluation);
         this.evaluateSolar();
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
                  [this.markers[0].getLatLng().lng, this.markers[0].getLatLng().lat],
                  [this.markers[1].getLatLng().lng, this.markers[1].getLatLng().lat],
               ],
               profile: "driving-car",
               format: "geojson",
            })
            .catch(error => {
               console.error(error);
            });
         this.carDistance = response.features[0].properties.summary.distance;
      },
      detailMarkerUpdate({ markerId, data }) {
         this[markerId] = data;
         this.refreshReport();
      },
      evaluateRoute(detailed) {
         const distance = this.routeLength / 1000; // in km
         const steepness = this.routeSteepness; // in %
         const averageDailyTraffic = this.averageDailyTraffic;
         const transportFrequency = this.transportFrequency;
         const villagesPopulation = [this.village1.population, this.village2.population];
         const villagePopulationMax = Math.max(...villagesPopulation);
         const villagePopulationMin = Math.min(...villagesPopulation);

         const distanceFactors = [
            { max: 3, factor: 1.0 },
            { max: 7, factor: 0.8 },
            { max: 12, factor: 0.5 },
            { max: 20, factor: 0.2 },
            { max: Infinity, factor: 0.0 }
         ];

         const steepnessFactors = [
            { max: 2, factor: 1.0 },
            { max: 5, factor: 0.8 },
            { max: 10, factor: 0.5 },
            { max: 20, factor: 0.2 },
            { max: Infinity, factor: 0.0 }
         ];

         const transportFrequencyFactors = [
            { min: 60, factor: 1.0 },
            { min: 30, factor: 0.75 },
            { min: 15, factor: 0.5 },
            { min: 5, factor: 0.25 },
            { min: 0, factor: 0.0 }
         ];

         const distanceEvaluation = distanceFactors.find(factor => distance < factor.max).factor;
         const steepnessEvaluation = steepnessFactors.find(factor => steepness < factor.max).factor;
         const transportFrequencyEvaluation = transportFrequencyFactors.find(factor => transportFrequency >= factor.min).factor;

         const roadFrequencyEvaluation = ((averageDailyTraffic / this.village1.maxAverageDailyTraffic) + (averageDailyTraffic / this.village2.maxAverageDailyTraffic) * (villagePopulationMin / villagePopulationMax)) / 2;

         const roadConnectionEvaluation = (this.village1.cycleLaneNumber / this.village1.roadNumber) + (this.village2.cycleLaneNumber / this.village2.roadNumber) / 2;

         const regularScore = (distanceEvaluation + steepnessEvaluation) / 2;
         const detailedScore = (distanceEvaluation + steepnessEvaluation + transportFrequencyEvaluation + roadFrequencyEvaluation + roadConnectionEvaluation) / 5;
         const score = detailed ? detailedScore : regularScore;
         const scoreOnFive = score * 5;
         this.routeScore = scoreOnFive;
      },
      evaluateSolar() {
         const irradiation = this.irradiation; // in kWh/m²/year
         const suppliedHouseNumber = this.solarPanelProduction / this.energyProHouse

         const irradiationFactors = [
            { min: 1400, factor: 1.0 },
            { min: 1200, factor: 0.8 },
            { min: 1000, factor: 0.5 },
            { min: 0, factor: 0.2 }
         ];

         const supplyFactors = [
            { min: 100, factor: 1.0 },
            { min: 65, factor: 0.8 },
            { min: 20, factor: 0.5 },
            { min: 0, factor: 0.2 }
         ];

         const irradiationEvaluation = irradiationFactors.find(factor => irradiation >= factor.min).factor;
         const supplyEvaluation = supplyFactors.find(factor => suppliedHouseNumber >= factor.min).factor;

         const score = (irradiationEvaluation + supplyEvaluation) / 2;
         const scoreOnFive = score * 5;
         this.solarScore = scoreOnFive;
      }
   },
};

</script>

<style scoped>
.report_container {
   display: grid;
   grid-template-columns: 1fr 1.2fr;
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
      margin-bottom: 0.8rem;
   }

   & .informationField {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
   }
}

hr {
   border: 0;
   border-top: 1px solid #ccc;
   margin: 2rem 0;
}

.info {
   color: #666;
   border: 1px solid #ccc;
   padding: 5px;
   margin-bottom: 15px;
}

.detailMarkers {
   display: grid;
   grid-template-columns: 1fr 2px 1fr;
   grid-gap: 1rem;

   & .detailMarker-separator {
      border-right: 1px solid #ccc;
   }
}

@media (max-width: 768px) {

   .report_container {
      grid-template-columns: 1fr;
      grid-gap: 1rem;
   }

   .title {
      font-size: 1.2rem;
   }

   .report_field {
      & .title {
         font-size: 1rem;
      }
   }

   .detailMarkers {
      grid-template-columns: 1fr;
      grid-gap: 0.8rem;

      & .detailMarker-separator {
         display: none;
      }
   }
}
</style>