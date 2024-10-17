<template>
  <div class="page">
    <keep-alive>
      <MapboxMap
        :access-token="apiToken"
        :map-options="{
          style: 'mapbox://styles/luckydonald/cjqwaq8xs3x9j2sn2cbsdzyt6',
          center: [-76.61703, 39.28529],
          zoom: 16,
          showCompass: false,
          showZoom: false,
        }"
        :hide-credits="false"
      />
    </keep-alive>
  </div>
</template>

<script setup>

import MapboxMap from '@/lib/vue-mapbox-gl/MapboxMap.vue';
import { defineComponent } from "vue";

defineComponent({
  name: 'WorldMap',
})
const apiToken = 'pk.eyJ1IjoibHVja3lkb25hbGQiLCJhIjoiY2o4MjExcDRnNnh1aDJxcGticXJqbmVkZiJ9.AeqEDvUViPfbMGqmPHLnBw';
</script>
<style scoped lang="scss">
.page {
  padding-left: 5vmin;
  padding-right: 3vmin;
  padding-bottom: 2vmin;
}
:global(#map .mapboxgl-control-container),
:global(#map .mapboxgl-control-container .mapboxgl-ctrl)
{
  display: none !important;
  pointer-events: auto!important;
  position: absolute;
  top: -100%;
}
</style>
