<!--
<template>
  <div class="app-container documentation-container">
    <h1>Map1</h1>
    <!-- шаблон карты -->
    <!-- условия показа карты -->
    <!--<div class="row">
      <div class="col-lg-11">
        <div id="map"/>
      </div>
      <div class="col-lg-1">
        <div>
          <h1>{{ typeMap }}</h1>
        </div>
        <div v-for="layer in layers" :key="layer.id" class="form-check">
          <!-- label and input elements go here -->
         <!-- <label class="form-check-label">
            <input
              v-model="layer.active"
              class="form-check-input"
              type="checkbox"
              @change="layerChanged(layer.id, layer.active)"
            >
            {{ layer.name }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
-->
<!-- <script>

// import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

// var objectData = {
//   /* Data properties will go here */
//   map: null,
//   tileLayer: null,
//   layers: [{
//     id: 0,
//     name: 'Объекты',
//     active: false,
//     features: [{
//       id: 0,
//       name: 'Инноватт',
//       type: 'marker',
//       coords: [55.763843, 37.579719]
//     },
//     {
//       id: 1,
//       name: 'Объект 1 (МТС)',
//       type: 'marker',
//       coords: [55.776487, 37.401474]
//     },
//     {
//       id: 2,
//       name: 'Объект 2 (МТС)',
//       type: 'marker',
//       coords: [55.746248, 37.621929]
//     }
//     ]
//   },

//   {
//     id: 1,
//     name: 'Тест округов',
//     active: false,
//     features: [{
//       id: 0,
//       name: 'City of St. Louis',
//       type: 'polygon',
//       coords: [
//         [38.770547, -90.168056],
//         [38.771350, -90.183334]
//       ]
//     }]
//   }

//   ]
// }
// console.log('objectData =', objectData)

// export default {
//   name: 'LeafletMap',
//   components: {
//     LMap,
//     LTileLayer,
//     LMarker
//   },
//   props: {
//     typeMap: {
//       type: String,
//       default: 'map'
//     },
//     typeView: {
//       type: String,
//       default: 'map'
//     }
//   },
//   data: function() {
//     return {
//       map: objectData.map,
//       tileLayer: objectData.tileLayer,
//       layers: objectData.layers,
//       type: '2'
//     }
//   },
//   mounted() {
//     /* Code to run when app is mounted */
//     this.initMap()
//   },
//   methods: {
//     /* Any app-specific functions go here */
//     initMap() {
//       this.map = L.map('map').setView([55.75, 37.61], 11)
//       this.tileLayer = L.tileLayer(
//         'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           maxZoom: 18,
//           attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;'
//         }
//       )
//       this.tileLayer.addTo(this.map)
//     },
//     initLayers() {
//       this.layers.forEach((layer) => {
//         // Initialize the layer
//         const markerFeatures = layer.features.filter(feature => feature.type === 'marker')
//         const polygonFeatures = layer.features.filter(feature => feature.type === 'polygon')

//         markerFeatures.forEach((feature) => {
//           feature.leafletObject = L.marker(feature.coords)
//             .bindPopup(feature.name)
//         })

//         polygonFeatures.forEach((feature) => {
//           feature.leafletObject = L.polygon(feature.coords)
//             .bindPopup(feature.name)
//         })
//       })
//     },
//     layerChanged(layerId, active) {
//       const layer = this.layers.find(layer => layer.id === layerId)
//       layer.features.forEach((feature) => {
//         /* Show or hide the feature depending on the active argument */
//         if (active) {
//           feature.leafletObject.addTo(this.map)
//         } else {
//           feature.leafletObject.removeFrom(this.map)
//         }
//       })
//     }
//   }
// }
// </script>

// <style rel="stylesheet/scss" lang="scss" scoped>
// .documentation-container {
// 	margin: 50px;
// 	.document-btn {
// 		float: left;
// 		margin-left: 50px;
// 		display: block;
// 		cursor: pointer;
// 		background: black;
// 		color: white;
// 		height: 60px;

// 		width: 200px;
// 		line-height: 60px;
// 		font-size: 20px;
// 		text-align: center;
// 	}
//   #map {
//     width: 50%;
//     margin-top: 50px;
//     margin-bottom: 50px;
//   }
// }
// </style>
