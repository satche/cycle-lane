<template>
  <Map @update-map-data="updateMapData" />
  <InfoPane :data="mapData"
            @generate-report="handleGenerateReport" />
  <Report v-if="isOpen"
          :data="reportData"  
          @close-report="isOpen = false" />
</template>

<script>
import { ref } from 'vue'
import Map from './components/Map.vue'
import InfoPane from './components/InfoPane.vue'
import Report from './components/Report.vue'

export default {

  components: {
    Map,
    InfoPane,
    Report
  },

  setup() {
    const mapData = ref({
      startMarker: null,
      endMarker: null,
      route: null,
    })

    const reportData = ref(null);

    const isOpen = ref(false);

    const handleGenerateReport = (data) => {
      reportData.value = data;
      isOpen.value = true;
    };

    const updateMapData = (data) => {
      mapData.value = { ...mapData.value, ...data };
    };

    return {
      mapData,
      isOpen,
      reportData,
      updateMapData,
      handleGenerateReport,
    }
  }
}
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  overflow: hidden;
}
</style>
