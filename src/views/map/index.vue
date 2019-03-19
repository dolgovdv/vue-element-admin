<template>
  <div>
    <user-map/>
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
          console.log('res', res.data[0])
          this.convertInputArray(res.data[0])
          return res.data[0]
        })
        .catch(err => {
          console.log('err = ', err)
        })
    },
    convertInputArray: function(arrInput) {
      arrInput.forEach(object => {
        const latLngArr = []
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const element = object[key]
            if (key === 'latit') {
              latLngArr.push(parseFloat(element))
              delete object[key]
            }
            if (key === 'longit') {
              latLngArr.push(parseFloat(element))
              delete object[key]
            }
            if (key === 'objname_rus') {
              object.content = element
              delete object[key]
            }
            object.latLng = latLngArr
            console.log('latLngArr', latLngArr)
          }
        }
      })
      console.log('arrInput', arrInput)
      // this.markers = arrInput
      return arrInput
    }
  }
}
</script>
