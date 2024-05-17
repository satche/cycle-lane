<script setup>
import { ref } from 'vue'
import Map from './components/Map.vue'
import InfoPane from './components/InfoPane.vue'

const mapData = ref({
  startMarker: null,
  endMarker: null,
  route: null,
})

const updateMapData = (data) => {
  mapData.value = { ...mapData.value, ...data };
};
</script>

<template>

  <Map @update-map-data="updateMapData" />
  <InfoPane :data="mapData" />

</template>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  overflow: hidden;
}
</style>
