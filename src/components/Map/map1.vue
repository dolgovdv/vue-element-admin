<template>
  <div>
    <div id="map" />
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'MapLeaflet',
  props: {
    marker: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      map: null,
      tileLayer: null,
      markers: null,
      iconAgent: L.icon({
        iconUrl: '/src/icons/svg/carbattery.svg',
        iconSize: [50, 65],
        iconAnchor: [16, 37]
      })
    }
  },
  watch: {
    marker: function(newVal, oldVal) {
      console.log('новое значение:, старое значение:', newVal, oldVal)
      // this.refreshMarkers()
      // this.addMarker(this.marker)
    }
  },
  mounted() {
    /* Code to run when app is mounted */
    this.initMap()
  },
  methods: {
    /* Any app-specific functions go here */
    initMap() {
      this.map = L.map('map', {
        center: [55.75, 37.61],
        zoom: 11,
        layers: this.layer
      })
      this.tileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;'
      })
      this.tileLayer.addTo(this.map)

      this.addMarker(this.marker)
    },
    addMarker(arr) {
      this.markers = L.markerClusterGroup({
        // отображение полилинии границы кластера
        showCoverageOnHover: true,
        // измененеие иконки маркера кластера
        iconCreateFunction: function(cluster) {
          let ClasterClass = 'marker-cluster marker-cluster-small'
          // leaflet-marker-icon marker-cluster marker-cluster-small leaflet-zoom-animated leaflet-interactive
          // console.log(cluster.getAllChildMarkers())
          // получение объектов кластера
          const markers = cluster.getAllChildMarkers()

          for (var i = 0; i < markers.length; i++) {
            console.log('markers[i].alarm', markers[i].alarm)
            if (markers[i].alarm !== null && markers[i].alarm !== undefined) {
              ClasterClass = 'myclusterAlarm'
            }
          }
          return L.divIcon({
            html: '<div>' + cluster.getChildCount() + '</div>',
            className: ClasterClass,
            iconSize: L.point(40, 40)
          })
        },
        singleMarkerMode: false
      })
      arr.forEach(element => {
        // формирование маркеров на слое кластера
        const fillMarker = this.fillingMarker(element)
        const markerLayerClaster = fillMarker // L.marker(element.coords)
        markerLayerClaster.alarm = element.alarm
        // L.marker(element.coords).addTo(this.map)
        // marker claster
        this.markers.addLayer(markerLayerClaster)
      })
      // добавление маркеров на слой
      this.map.addLayer(this.markers)

      this.refreshMarkers()
    },
    refreshMarkers() {
      console.log('refreshMarkers')
      this.markers.refreshClusters()
    },
    // наполнение маркера
    fillingMarker(dataMarker) {
      console.log('dataMarker ', dataMarker)
      let marker = null
      if (dataMarker.agent) {
        marker = L.marker(dataMarker.coordinates, { icon: this.iconAgent })
      } else {
        marker = L.marker(dataMarker.coordinates)
      }
      marker.bindPopup('<p>' + dataMarker.title + '</p><button type="button"> <a href="#/device/' + dataMarker.id + '" class="">Подробнее</a>').openPopup()
      return marker
    }
  }
}
</script>

<style>
#map {
  height: 850px;
}
.marker-cluster-small {
  background-color: rgba(147, 226, 137, 0.6);
}
.marker-cluster-small div {
  background-color: rgba(71, 206, 71, 0.6);
}
.marker-cluster {
	background-clip: padding-box;
	border-radius: 20px;
	}
.marker-cluster div {
	width: 30px;
	height: 30px;
	margin-left: 5px;
	margin-top: 5px;

	text-align: center;
	border-radius: 15px;
	font: 12px "Helvetica Neue", Arial, Helvetica, sans-serif;
	}
.marker-cluster span {
	line-height: 30px;
	}
</style>
