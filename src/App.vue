<script setup>
import { ref } from 'vue'
import Map from './components/Map.vue'
import Informations from './components/Informations.vue'

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
  <Informations :mapData="mapData" />

</template>

<style>
body {
  margin: 0;
}
</style>
