<template>

  <div>
    <div v-if="!DataObject">Данные загружаются</div>
    <device-form v-else :device-data="DataObject"/>
  </div>

</template>

<script>
import DeviceForm from '@/components/Device/DeviceForm.vue'

import service from '@/utils/request.js'

export default {
  name: 'DevicePanel',
  components: {
    'device-form': DeviceForm
  },
  data() {
    return {
      DataObject: null
    }
  },
  computed: {
    id() {
      return this.$route.params.id || 1
    },
    query() {
      return 'inventorydb.f_get_passport_object_nodejs(' + this.id + ')'
    }
  },
  mounted: function() {
    this.getObjectData(this.query)
  },
  methods: {
    getObjectData: function(query) {
      console.log('query', query)
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
          // this.convertInputArray(res.data[0])
          this.DataObject = Object.assign({}, res.data[0])
          // console.log('this.DataObject = ', this.DataObject)
          return res.data[0]
        })
        .catch(err => {
          console.log('err = ', err)
        })
    }
  }
}
</script>

