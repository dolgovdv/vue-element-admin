<template>
  <div style="height: 100%; width: 100%">
    <div class="info" style="height: 15%">
      <span>Zoom: {{ zoom }}</span>
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 850px"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"/>
      <v-marker-cluster ref="clusterRef">
        <l-marker v-for="item in markers" :key="item.id" :lat-lng="item.coordinates" :icon="changeIcons(item.agent)">
          <l-popup>
            {{ item.title }}
            <button type="button">
              <router-link :to="'/device/' + item.id">
                Подробнее
              </router-link>
            </button>
          </l-popup>
        </l-marker>
      </v-marker-cluster>
    </l-map>
  </div>
</template>

<script>
// vue2leaflet
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from 'vue2-leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'

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
    'l-tile-layer': LTileLayer,
    'l-marker': LMarker,
    'l-popup': LPopup,
    'v-marker-cluster': Vue2LeafletMarkerCluster,
    'l-icon': LIcon
  },
  props: {
    markers: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 11,
      center: [55.75, 37.61],
      bounds: null,
      // eslint-disable-next-line
      icon: L.icon({
        iconUrl: '/src/icons/svg/carbattery.svg',
        iconSize: [50, 65],
        iconAnchor: [16, 37]
      })
    }
  },
  mounted() {
    this.refreshClaster()
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
    },
    changeIcons(agent) {
      // console.log('agent', agent)
      return agent === null ? agent : this.icon
    },
    refreshClaster() {
      // this.$refs.clusterRef.mapObject.refreshClusters() // I don't know how to use it
    }
  }
}
</script>

<style>
@import "leaflet.markercluster/dist/MarkerCluster.css";
@import "leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>

