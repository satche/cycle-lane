<template>
  <Map @update-map-data="updateMapData" />
  <InfoPane :data="mapData"
            @generate-report="showReport = $event" />
  <Report v-if="showReport"
          @close-report="showReport = false" />
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

    const showReport = ref(false);

    const updateMapData = (data) => {
      mapData.value = { ...mapData.value, ...data };
    };

    return {
      mapData,
      showReport,
      updateMapData,
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
