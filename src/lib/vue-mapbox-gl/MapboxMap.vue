<template>
  <div
      :id="
      mapOptions.hasOwnProperty('container') &&
     mapOptions.container !== undefined &&
      typeof mapOptions.container === 'string'
        ? mapOptions.container
        : 'map'
    "
      class="mapbox-map" :class="{ 'hide-credits': hideCredits }"
  ></div>
</template>

<script lang="ts">
import type {MapboxOptions as FullMapboxOptions} from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import type {PropType} from 'vue';

export const Marker = mapboxgl.Marker;
export type LightMapboxOptions = Omit<FullMapboxOptions, 'container'>;
export type MapboxOptions = LightMapboxOptions & { container?: FullMapboxOptions['container'] };

export default {
  name: 'MapboxMap',
  data() {
    return {
      // eslint-disable-next-line vue/no-reserved-keys
      _map: null as mapboxgl.Map | null,
      // eslint-disable-next-line vue/no-reserved-keys
      _mapOptions: null as MapboxOptions | null,
    }
  },
  props: {
    accessToken: {
      type: String,
      required: true,
    },
    mapOptions: {
      type: Object as PropType<MapboxOptions>,
      required: true,
    },
    mapMarkers: {
      type: Array as PropType<mapboxgl.Marker[]>,
      required: false,
      default: () => [],
    },
    navControl: {
      type: Object,
      default: () => ({
        show: true,
        position: 'top-right',
      }),
    },
    geolocateControl: {
      type: Object,
      default: () => ({
        show: false,
        position: 'top-left',
        options: {},
      }),
    },
    scaleControl: {
      type: Object,
      default: () => ({
        show: false,
        position: 'top-left',
        options: {},
      }),
    },
    fullscreenControl: {
      type: Object,
      default: () => ({
        show: false,
        position: 'top-right',
      }),
    },
    hideCredits: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // Initialze Map
    const map = this.mapInit();
    // Save map object to data
    // eslint-disable-next-line no-underscore-dangle
    this._map = map;
    // Add Controls to map
    this.addControls(map);
    // Register Map Events
    this.registerEvents(map);
  },
  methods: {
    mapInit() {
      // Mapbox GL access token
      mapboxgl.accessToken = this.accessToken;
      // Add container to options object
      // eslint-disable-next-line no-prototype-builtins
      let mapOptions: MapboxOptions = {...this.mapOptions} as MapboxOptions | FullMapboxOptions
      if (!Object.prototype.hasOwnProperty.call(mapOptions, 'container')) {
        mapOptions = {...mapOptions, container: 'map'} as FullMapboxOptions
      }
      this._mapOptions = mapOptions
      // New Mapbox Instance
      const map = new mapboxgl.Map(mapOptions as FullMapboxOptions);
      // apply markers to the map.
      this.mapMarkers.forEach((marker: mapboxgl.Marker) => {
        marker.addTo(map);
      });
      // Emit init event passing map object
      this.$emit('map-init', map);
      return map;
    },
    registerEvents(map: mapboxgl.Map) {
      // Map Loaded
      map.on('load', () => {
        this.$emit('map-load', map);
      });
      // Map Mouse Move
      map.on('mousemove', (e: object | undefined) => {
        this.$emit('map-mousemove', map, e);
      });
      // Map Clicked
      map.on('click', (e: object | undefined) => {
        this.$emit('map-click', map, e);
      });
      // Map Context Menu
      map.on('contextmenu', (e: object | undefined) => {
        this.$emit('map-contextmenu', map, e);
      });
      // Map Resized
      map.on('resize', () => {
        this.$emit('map-resize', map);
      });
      // Map Webgl Context Lost
      map.on('webglcontextlost', (e: object | undefined) => {
        this.$emit('map-webglcontextlost', map, e);
      });
      // Map Webgl Context Restored
      map.on('webglcontextrestored', (e: object | undefined) => {
        this.$emit('map-webglcontextrestored', map, e);
      });
      // Map Removed
      map.on('remove', () => {
        this.$emit('map-remove', map);
      });
      // Map Source Data Loading
      map.on('sourcedataloading', (e: object | undefined) => {
        this.$emit('map-sourcedataloading', map, e);
      });
      // Map Touch Start
      map.on('touchstart', (e: object | undefined) => {
        this.$emit('map-touchstart', map, e);
      });
      // Map Move Start
      map.on('movestart', (e: object | undefined) => {
        this.$emit('map-movestart', map, e);
      });
      // Map Move
      map.on('move', (e: object | undefined) => {
        this.$emit('map-move', map, e);
      });
      // Map Move End
      map.on('moveend', (e: object | undefined) => {
        this.$emit('map-moveend', map, e);
      });
      // Map Error
      map.on('error', (e: object | undefined) => {
        this.$emit('map-error', map, e);
      });
      // Map Data
      map.on('data', (e: object | undefined) => {
        this.$emit('map-data', map, e);
      });
      // Map Style Data
      map.on('styledata', (e: object | undefined) => {
        this.$emit('map-styledata', map, e);
      });
      // Map Mouse Up
      map.on('mouseup', (e: object | undefined) => {
        this.$emit('map-mouseup', map, e);
      });
      // Map Touch Cancel
      map.on('touchcancel', (e: object | undefined) => {
        this.$emit('map-touchcancel', map, e);
      });
      // Map Source Data
      map.on('sourcedata', (e: object | undefined) => {
        this.$emit('map-sourcedata', map, e);
      });
      // Map Data Loading
      map.on('dataloading', (e: object | undefined) => {
        this.$emit('map-dataloading', map, e);
      });
      // Map Style Data Loading
      map.on('styledataloading', (e: object | undefined) => {
        this.$emit('map-styledataloading', map, e);
      });
      // Map Double Click
      map.on('dblclick', (e: object | undefined) => {
        this.$emit('map-dblclick', map, e);
      });
      // Map Render
      map.on('render', () => {
        this.$emit('map-render', map);
      });
      // Map Mouse Out
      map.on('mouseout', (e: object | undefined) => {
        this.$emit('map-mouseout', map, e);
      });
      // Map Mouse Down
      map.on('mousedown', (e: object | undefined) => {
        this.$emit('map-mousedown', map, e);
      });
      // Map Mouse Over
      map.on('mouseover', (e: object | undefined) => {
        this.$emit('map-mouseover', map, e);
      });
      // Map Touch End
      map.on('touchend', (e: object | undefined) => {
        this.$emit('map-touchend', map, e);
      });
      // Map Touch Move
      map.on('touchmove', (e: object | undefined) => {
        this.$emit('map-touchmove', map, e);
      });
      // Map Zoom Start
      map.on('zoomstart', (e: object | undefined) => {
        this.$emit('map-zoomstart', map, e);
      });
      // Map Zoom End
      map.on('zoomend', (e: object | undefined) => {
        this.$emit('map-zoomend', map, e);
      });
      // Map Zoom
      map.on('zoom', (e: object | undefined) => {
        this.$emit('map-zoom', map, e);
      });
      // Map Box Zoom Cancel
      map.on('boxzoomcancel', (e: object | undefined) => {
        this.$emit('map-boxzoomcancel', map, e);
      });
      // Map Box Zoom End
      map.on('boxzoomend', (e: object | undefined) => {
        this.$emit('map-boxzoomend', map, e);
      });
      // Map Box Zoom Start
      map.on('boxzoomstart', (e: object | undefined) => {
        this.$emit('map-boxzoomstart', map, e);
      });
      // Map Rotate Start
      map.on('rotatestart', (e: object | undefined) => {
        this.$emit('map-rotatestart', map, e);
      });
      // Map Rotate
      map.on('rotate', (e: object | undefined) => {
        this.$emit('map-rotate', map, e);
      });
      // Map Rotate End
      map.on('rotateend', (e: object | undefined) => {
        this.$emit('map-rotateend', map, e);
      });
      // Map Drag End
      map.on('dragend', (e: object | undefined) => {
        this.$emit('map-dragend', map, e);
      });
      // Map Drag
      map.on('drag', (e: object | undefined) => {
        this.$emit('map-drag', map, e);
      });
      // Map Drag
      map.on('dragstart', (e: object | undefined) => {
        this.$emit('map-dragstart', map, e);
      });
      // Map Pitch
      map.on('pitch', (e: object | undefined) => {
        this.$emit('map-pitch', map, e);
      });
      // Map Pitch Start
      map.on('pitchstart', (e: object | undefined) => {
        this.$emit('map-pitchstart', map, e);
      });
      // Map Pitch End
      map.on('pitchend', (e: object | undefined) => {
        this.$emit('map-pitchend', map, e);
      });
    },
    addControls(map: mapboxgl.Map) {
      // Nav Control
      if (this.navControl.show) {
        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, this.navControl.position);
      }
      // Geolocation Control
      if (this.geolocateControl.show) {
        const geolocate = new mapboxgl.GeolocateControl(this.geolocateControl.options);
        map.addControl(geolocate, this.geolocateControl.position);
        geolocate.on('geolocate', (position) => {
          this.$emit('geolocate-geolocate', geolocate, position);
        });
        geolocate.on('trackuserlocationstart', () => {
          this.$emit('geolocate-trackuserlocationstart', geolocate);
        });
        geolocate.on('trackuserlocationend', () => {
          this.$emit('geolocate-trackuserlocationend', geolocate);
        });
        geolocate.on('error', (positionError) => {
          this.$emit('geolocate-error', geolocate, positionError);
        });
      }
      // Scale Control
      if (this.scaleControl.show) {
        const scale = new mapboxgl.ScaleControl(this.scaleControl.options);
        map.addControl(scale, this.scaleControl.position);
      }
      // Fullscreen Control
      if (this.fullscreenControl.show) {
        const fullscreen = new mapboxgl.FullscreenControl();
        map.addControl(fullscreen, this.fullscreenControl.position);
      }
    },
  },
  beforeUnmount() {
    // eslint-disable-next-line no-underscore-dangle
    if (this._map) {
      this._map.remove();
    }
  },
  watch: {
    mapMarkers(oldMarkers, newMarkers) {
      if (oldMarkers) {
        oldMarkers.forEach((oldMarker: mapboxgl.Marker) => {
          if (!newMarkers || newMarkers.indexOf(oldMarker) === -1) {
            // '--> no longer in the marker list
            oldMarker.remove();
          }
        });
      }
      if (newMarkers) {
        newMarkers.forEach((newMarker: mapboxgl.Marker) => {
          if ((!oldMarkers || oldMarkers.indexOf(newMarker) === -1) && this._map != null) {
            // '--> was never in the marker list
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            newMarker.addTo(this._map as any);
          }
        });
      }
    },
  },
};

</script>

<style lang="scss">
@use 'mapbox-gl/dist/mapbox-gl.css' as mapbox;

.mapbox-map {
  &.hide-credits .mapboxgl-ctrl-logo,
  &.hide-credits .mapboxgl-ctrl-attrib {
    display: none !important;
    visibility: hidden !important;
  }
}
</style>
