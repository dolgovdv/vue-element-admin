<template>
  <div style="height: 100%; width: 100%">
    <div class="info" style="height: 15%">
      <span>Zoom: {{ zoom }}</span>
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      class="map"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"/>
    </l-map>
  </div>
</template>

<script>
// vue2leaflet
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer } from 'vue2-leaflet'

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'LeafletMap',
  components: {
    'l-map': LMap,
    'l-tile-layer': LTileLayer
  },
  props: {
    markers: {
      type: Array,
      default: () => ([{
        id: 1,
        latLng: [55.742121, 37.593232],
        content: '1'
      }])
    }
  },
  data() {
    return {
      url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 11,
      center: [55.75, 37.61],
      bounds: null
    }
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom
    },
    centerUpdated(center) {
      this.center = center
    },
    boundsUpdated(bounds) {
      this.bounds = bounds
    }
  }
}
</script>

<style>
.map{
  height: 600px;
  width: 800px;
}
</style>

