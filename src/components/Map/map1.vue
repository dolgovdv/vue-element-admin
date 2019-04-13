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
      markerLayer: null,
      markersArray: null,
      markersLayer: null,
      iconDefault: L.icon({
        iconUrl: '/src/icons/svg/location-pointer.svg',
        iconSize: [50, 65],
        iconAnchor: [16, 37]
      }),
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
      // this.addMarker(this.marker)
      this.createMarkerLayer(this.marker)

      // добавление боковой панели
      this.map.on('click', () => {
        this.sidebarShow = false
      })
    },

    // создание слоя маркеров
    createMarkerLayer(data) {
      // console.log('createMarkerLayer', data)
      const promiseMarkerArray = this.createMarkerArray(data)
      promiseMarkerArray
        .then(res => {
          this.markersArray = res
          // console.log('this.markerLayer', this.markersArray)
          this.markerLayer = L.layerGroup(this.markersArray)

          this.addMarker()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // создание массива маркеров
    createMarkerArray(data) {
      return new Promise((res, rej) => {
        return res(data.map(item => {
          let icon = null
          item.agent !== null ? icon = this.iconAgent : icon = this.iconDefault
          const marker = L.marker(item.coordinates, { title: item.title, icon: icon })
          marker.bindPopup('<p>' + item.title + '</p>').openPopup()
          marker.on('click', () => {
            this.sidebarToggle(item.id)
          })
          marker.alarm = item.alarm
          marker.agent = item.agent
          return marker
        }))
      })
    },

    // наполнение кластера маркеров
    addMarker() {
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
            // аварийный маркер
            if (markersLayer[i].alarm !== null && markersLayer[i].alarm !== undefined) {
              ClasterClass = 'leaflet-marker-icon marker-cluster leaflet-zoom-animated leaflet-interactive marker-cluster-small-alarm marker-cluster-small-alarm div'
            }

            // маркер с оборудованием
            if (markersLayer[i].agent !== null && markersLayer[i].agent !== undefined) {
              ClasterClass = 'leaflet-marker-icon leaflet-zoom-animated leaflet-interactive marker-cluster-small marker-cluster-small div'
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
      // добавление маркеров на слой
      this.markersLayer.addLayer(this.markerLayer)
      this.map.addLayer(this.markersLayer)

      // добавление поиска
      this.createSearch()

      // this.refreshMarkers()
    },
    refreshMarkers() {
      console.log('refreshMarkers')
      this.markersLayer.refreshClusters()
    },
    // управление боковой панелью
    sidebarToggle(data) {
      // console.log('sidebar.show()')
      this.objectId = data
      this.sidebarShow = true
    },
    // создание слоя для поиска
    createSearch() {
      const markersLayerT = new L.LayerGroup()	// layer contain searched elements

      this.map.addLayer(markersLayerT)

      this.searchLayer = new L.Control.Search({
        position: 'topleft',
        layer: markersLayerT,
        initial: true,
        zoom: 18,
        marker: false
      })
      this.map.addControl(this.searchLayer)

      for (const i in this.marker) {
        console.log(this.marker[i].coordinates)
        const title = this.marker[i].title	// v alue searched
        const loc = this.marker[i].coordinates		// position found
        const marker = L.Marker(loc, { title: title }) // se property searched
        marker.bindPopup('title: ' + title)
        markersLayerT.addLayer(marker)
      }
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
.marker-cluster-small-alarm {
  background-color: rgba(233, 150, 150, 0.747);
}
.marker-cluster-small-alarm div {
  background-color: rgba(206, 121, 71, 0.616);
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
