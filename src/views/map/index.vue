<template>
  <div>
    <!--
    <user-map v-if="markers" :markers="markers"/>
    -->
    <user-map1 v-if="markers" :marker="markers"/>
    <div v-else>
      <h1>Данные загружаются</h1>
    </div>

    <hr>

    <div/>
  </div>
</template>

<script>
import UserMap from '@/components/Map/map.vue'
import UserMap1 from '@/components/Map/map1.vue'
import service from '@/utils/request.js'

import io from '@/components/Socket/socket.vue'

export default {
  name: 'UserMap',
  components: {
    'user-map': UserMap,
    'user-map1': UserMap1,
    'io': io
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
      query = query || 'inventorydb.f_get_list_object_nodejs()'
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
      // arrInput.forEach(object => { // перебор объектов по массиву
      //   this.combinePropsToNewProp(object, ['latit', 'longit'], 'coordinates')
      //   this.renameProp(object, 'objname_rus', 'title')
      // })
      const arr = arrInput.map((item, i, arr) => {
        return { id: item.id, coordinates: [item.latit, item.longit], title: item.objname_rus, agent: item.agent, alarm: null }
      })
      console.log('arr index map =', arr)
      this.markers = arr
      return arrInput
    }
  }
}
</script>
