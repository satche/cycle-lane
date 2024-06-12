<template>

  <Modal :isOpen="isOnboardingOpen"
         @close="isOnboardingOpen = false">
    <Onboarding @close="isOnboardingOpen = false" />
  </Modal>

  <Map @update-map-data="updateMapData" />

  <InfoPane :data="mapData"
            @generate-report="handleGenerateReport"
            @open-onboarding="isOnboardingOpen = true" />

  <Modal :isOpen="isReportOpen"
         @close="isReportOpen = false">
    <Report :data="reportData" />
  </Modal>

</template>

<script>
import { ref } from 'vue'
import Map from './components/Map.vue'
import InfoPane from './components/info-pane/InfoPane.vue'
import Report from './components/Report.vue'
import Modal from './components/ui/Modal.vue'
import Onboarding from './components/Onboarding.vue'

export default {

  components: {
    Map,
    InfoPane,
    Report,
    Modal,
    Onboarding,
  },

  setup() {
    const mapData = ref({
      startMarker: null,
      endMarker: null,
      route: null,
    })

    const reportData = ref(null);

    const isReportOpen = ref(false);

    const isOnboardingOpen = ref(true);

    const handleGenerateReport = (data) => {
      reportData.value = data;
      isReportOpen.value = true;
    };

    const updateMapData = (data) => {
      mapData.value = { ...mapData.value, ...data };
    };

    return {
      mapData,
      isReportOpen,
      isOnboardingOpen,
      reportData,
      updateMapData,
      handleGenerateReport,
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  overflow: hidden;
}

.btn {
  padding: 10px 20px;
  color: black;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    background: white;
    box-shadow: 0px 3px 0px rgb(0, 0, 0);
    cursor: pointer;
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0px 0px 0px rgb(0, 0, 0);
  }
}
</style>
