<template>
  <div>
    <user-map v-if="markers" :markers="markers"/>
    <div v-else>
      <h1>Данные загружаются</h1>
    </div>
  </div>
</template>

<script>
import UserMap from '@/components/Map/map.vue'
import service from '@/utils/request.js'

export default {
  name: 'UserMap',
  components: {
    'user-map': UserMap
  },
  data: function() {
    return {
      markers: null
    }
  },
  mounted: function() {
    this.getObjectData()
  },
  methods: {
    getObjectData: function(query) {
      query = query || 'inventorydb.f_get_object_nodejs()'
      service({
        method: 'post',
        url: '/select',
        data: {
          typeObject: 'object',
          nameObject: query
          // nameObject: 'public.test'
        }
      })
        .then(res => {
          // console.log('res', res.data[0])
          this.convertInputArray(res.data[0])
          return res.data[0]
        })
        .catch(err => {
          console.log('err = ', err)
        })
    },
    convertInputArray: function(arrInput) {
      arrInput.forEach(object => { // перебор объектов по массиву
        const latLngArr = [] // массив для объединения свойств
        for (const key in object) { // перебор свойств объекта
          if (object.hasOwnProperty(key)) {
            const element = object[key]
            // переопределение свойств
            if (key === 'latit') {
              latLngArr.push(element)
              delete object[key]
            }
            if (key === 'longit') {
              latLngArr.push(element)
              delete object[key]
            }
            // создание из двух свойств в один массив
            object.coordinates = latLngArr

            if (key === 'objname_rus') {
              object.title = element
              delete object[key]
            }
            // console.log('latLngArr', latLngArr)
          }
        }
      })
      // console.log('arrInput', arrInput)
      this.markers = arrInput
      return arrInput
    }
  }
}
</script>
