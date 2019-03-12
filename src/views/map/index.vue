<template>
  <div style="height: 100%; width: 100%">
    <div class="info" style="height: 15%">
      <span>Zoom: {{ zoom }}</span>
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 600px; width: 800px"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"/>
      <l-marker :lat-lng="markerLatLng"/>
    </l-map>
  </div>
</template>

<script>
// vue2leaflet
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const lMap = LMap
const lTileLayer = LTileLayer
const lMarker = LMarker

export default {
  name: 'LeafletMap',
  components: {
    'l-map': lMap,
    'l-tile-layer': lTileLayer,
    'l-marker': lMarker
  },
  data() {
    return {
      url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 11,
      center: [55.75, 37.61],
      bounds: null,
      markerLatLng: [55.752121, 37.613232]
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
