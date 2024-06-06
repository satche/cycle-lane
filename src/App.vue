<template>

  <Map @update-map-data="updateMapData" />

  <InfoPane :data="mapData"
            @generate-report="handleGenerateReport" />

  <Modal :isOpen="isModalOpen"
         @close="isModalOpen = false">
    <Report :data="reportData" />
  </Modal>

</template>

<script>
import { ref } from 'vue'
import Map from './components/Map.vue'
import InfoPane from './components/info-pane/InfoPane.vue'
import Report from './components/Report.vue'
import Modal from './components/ui/Modal.vue'

export default {

  components: {
    Map,
    InfoPane,
    Report,
    Modal,
  },

  setup() {
    const mapData = ref({
      startMarker: null,
      endMarker: null,
      route: null,
    })

    const reportData = ref(null);

    const isModalOpen = ref(false);

    const handleGenerateReport = (data) => {
      reportData.value = data;
      isModalOpen.value = true;
    };

    const updateMapData = (data) => {
      mapData.value = { ...mapData.value, ...data };
    };

    return {
      mapData,
      isModalOpen,
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
</style>
