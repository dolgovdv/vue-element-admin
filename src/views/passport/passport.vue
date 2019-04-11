<template>

  <div>
    <div v-if="!DataObject">Данные загружаются</div>
    <device-form v-else :device-data="DataObject"/>
  </div>

</template>

<script>
import DeviceForm from '@/components/Passport/PassportForm.vue'

import getData from '@/utils/requestToServer.js'

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
      // console.log('query', query)
      getData(query)
        .then(res => {
          // for (const key in res[0]) {
          //   this.$set(this.DataObject, key, res[0].key)
          // }
          // this.$set(this.DataObject, item.series, item.y)
          this.DataObject = res[0]
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

