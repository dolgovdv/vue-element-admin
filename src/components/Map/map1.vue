<template>
  <div>
    <div class="parentMap">
      <div id="map" class="left_block" />
      <side-bar v-if="sidebarShow" :id-data="objectId" class="right_block" />
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import SideBar from '@/components/Map/components/sidebar.vue'
import 'leaflet-search'
import 'leaflet-search/src/leaflet-search.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'MapLeaflet',
  components: {
    'side-bar': SideBar
  },
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
      markersLayer: null,
      iconAgent: L.icon({
        iconUrl: '/src/icons/svg/carbattery.svg',
        iconSize: [50, 65],
        iconAnchor: [16, 37]
      }),
      sidebarShow: false,
      objectId: null,
      searchLayer: null
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

      // добавление маркеров
      // console.log('marker', this.marker)
      this.addMarker(this.marker)

      // добавление боковой панели
      this.map.on('click', () => {
        this.sidebarShow = false
      })

      // добавление поиска
      this.createSearch(this.marker)
    },
    // наполнение кластера маркеров
    addMarker(arr) {
      this.markersLayer = L.markerClusterGroup({
        // отображение полилинии границы кластера
        showCoverageOnHover: true,
        // измененеие иконки маркера кластера
        iconCreateFunction: function(cluster) {
          let ClasterClass = 'marker-cluster marker-cluster-small'
          // leaflet-marker-icon marker-cluster marker-cluster-small leaflet-zoom-animated leaflet-interactive
          // console.log(cluster.getAllChildMarkers())
          // получение объектов кластера
          const markersLayer = cluster.getAllChildMarkers()

          for (var i = 0; i < markersLayer.length; i++) {
            // console.log('markersLayer[i].alarm', markersLayer[i].alarm)
            if (markersLayer[i].alarm !== null && markersLayer[i].alarm !== undefined) {
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
        // marker claster
        this.markersLayer.addLayer(markerLayerClaster)
      })
      // добавление маркеров на слой
      this.map.addLayer(this.markersLayer)

      this.refreshMarkers()
    },
    refreshMarkers() {
      console.log('refreshMarkers')
      this.markersLayer.refreshClusters()
    },
    // наполнение маркера
    fillingMarker(dataMarker) {
      // console.log('dataMarker ', dataMarker)
      let marker = null
      if (dataMarker.agent) {
        marker = L.marker(dataMarker.coordinates, { title: dataMarker.title }, { icon: this.iconAgent })
      } else {
        marker = L.marker(dataMarker.coordinates, { title: dataMarker.title })
        // console.log('title', dataMarker.title)
      }
      marker.title = dataMarker.title
      // добавление кнопки перехода на панель
      // <button type="button"> <a href="#/device/' + dataMarker.id + '" class="">Подробнее</a></button>
      marker.bindPopup('<p>' + dataMarker.title + '</p>').openPopup()
      marker.on('click', () => {
        this.sidebarToggle(dataMarker.id)
      })
      return marker
    },
    // управление боковой панелью
    sidebarToggle(data) {
      // console.log('sidebar.show()')
      this.objectId = data
      this.sidebarShow = true
    },
    // создание слоя для поиска
    createSearch(data) {
      this.searchLayer = new L.Control.Search({
        position: 'topleft',
        layer: this.markersLayer,
        initial: false,
        zoom: 18,
        marker: false
      })
      this.map.addControl(this.searchLayer)
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
.parentMap {
  display: flex;
}
div.left_block {
  width: 100%;
}
div.right_block {
  min-width: 400px;
}
.leaflet-control-search .search-tooltip {
	position:absolute;
	top:100%;
	left:0;
	float:left;
	list-style: none;
	padding-left: 0;
	min-width:220px;
	max-height:350px;
	box-shadow: 1px 1px 6px rgba(0,0,0,0.4);
	background-color: rgba(0, 0, 0, 0.25);
	z-index:1010;
	overflow-y:auto;
	overflow-x:hidden;
	cursor: pointer;
}
</style>
