<template>
  <div>

    <div v-if="DataObject">
      <h1>{{ DataObject.title_rus }}</h1>
      <table>
        <tbody>
          <tr>
            <td>
              <h3>Место расположения</h3>
            </td>
            <td>
              <input :value="checkData(DataObject.address)" type="text" disabled="disabled">
            </td>
          </tr>
          <tr>
            <td>
              <h3>Серийный номер</h3>
            </td>
            <td>
              <input :value="checkData(DataObject.serialnumber)" type="text" disabled="disabled">
            </td>
          </tr>
          <tr>
            <td>
              <h3>Установка оборудования</h3>
            </td>
            <td>
              <input :value="installAgent(DataObject.agent)" type="text" disabled="disabled">
            </td>
          </tr>
        </tbody>
      </table>

      <button type="button">
        <router-link :to="'/device/' + DataObject.id">
          Подробнее
        </router-link>
      </button>

    </div>

  </div>
</template>

<script>

// import service from '@/utils/request.js'
import getData from '@/utils/requestToServer.js'

export default {
  name: 'InfoSideBar',
  props: {
    idData: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      DataObject: null
    }
  },
  computed: {
    query() {
      return 'inventorydb.f_get_info_object_nodejs(' + this.idData + ')'
    }
  },
  watch: {
    idData() {
      // console.log('watch', this.idData)
      this.getObjectData(this.query)
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
    },
    installAgent(agent) {
      return agent || 'Агент не установлен'
    },
    checkData(data) {
      // console.log('checkData(data)', data)
      return data === undefined ? 'Нет данных' : data
    }
  }
}
</script>
