<template>
  <div>

    <div>
      <h1>{{ LocalObject.title_rus }}</h1>
      <table>
        <tbody>
          <tr>
            <td>
              <h3>Место расположения</h3>
            </td>
            <td>
              <input :value="checkData(LocalObject.address)" type="text" disabled="disabled">
            </td>
          </tr>
          <tr>
            <td>
              <h3>Серийный номер</h3>
            </td>
            <td>
              <input :value="checkData(LocalObject.serialnumber)" type="text" disabled="disabled">
            </td>
          </tr>
          <tr>
            <td>
              <h3>Установка оборудования</h3>
            </td>
            <td>
              <input :value="installAgent(LocalObject.agent)" type="text" disabled="disabled">
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="checkDataObject">
        <h2>Состояние конвертора</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <h3>Текущий режим</h3>
              </td>
              <td>
                <input :value="modeConvert(DataLocalObject[5].y)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Выходная мощность(План), Вт</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject[6].y)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Выходная мощность(Факт), Вт</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject[6].y)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Выходная мощность, Вт</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject[4].y)" type="text" disabled="disabled">
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Состояние конвертора</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <h3>Режим компенсации</h3>
              </td>
              <td>
                <input :value="modeMode()" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Напряжение на батарее, В</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject[11].y)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Напряжение нагрузки, В</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject[10].y)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Ток нагрузки, А</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject[3].y)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Мощность, Вт</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject[4].y)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Температура, С</h3>
              </td>
              <td>
                <input :value="checkData(LocalObject.watt)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Питание +5, V</h3>
              </td>
              <td>
                <input :value="checkData(LocalObject.watt)" type="text" disabled="disabled">
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Состояние батареи</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <h3>Напряжение, В</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject[9].y)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Ток, А</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject[8].y)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Мощность, Вт</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject[0].y)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Температура, С</h3>
              </td>
              <td>
                <input :value="checkData(LocalObject.watt)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Заряд, %</h3>
              </td>
              <td>
                <input :value="checkData(LocalObject.watt)" type="text" disabled="disabled">
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </div>
</template>

<script>
import service from '@/utils/request.js'

export default {
  name: 'DeviceForm',
  props: {
    DeviceData: {
      type: [Array, Object],
      required: true
    }
  },
  data() {
    return {
      LocalObject: {},
      DataLocalObject: []
    }
  },
  computed: {
    query() {
      return 'statistic.f_view_statistic_by_obj_nodejs(' + this.LocalObject.id + ')'
    },
    checkDataObject() {
      return this.DataLocalObject.length === 0 ? 0 : 1
    }
  },
  mounted: function() {
    this.requestDBTimeout()
  },
  created() {
    // Копируем пользователя в локальное состояние
    this.LocalObject = Object.assign({}, this.DeviceData[0])
    // console.log('this.LocalObject = ', this.LocalObject, 'this.DeviceData = ', this.DeviceData)
  },
  methods: {
    installAgent(agent) {
      return agent || 'Агент не установлен'
    },
    checkData(data) {
      // console.log('checkData(data)', data)
      return data === undefined ? 'Нет данных' : data
    },
    getObjectData: function(query) {
      // console.log('query', query)
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
          // console.log('res DataLocalObject', res)
          // this.convertInputArray(res.data[0])
          this.DataLocalObject = res.data[0] // присваивание
          // console.log('this.DataLocalObject = ', this.DataLocalObject)
          return res.data[0]
        })
        .catch(err => {
          console.log('err = ', err)
        })
    },
    modeMode(data) {
      return data || 'Минутный'
    },
    modeConvert(data) {
      // console.log('modeConvert', data)
      if (this.checkData(data) === 'Нет данных') {
        return 'Нет данных'
      }
      if (data === 1) { return 'StandBy' }
      if (data === 2) { return 'ByPass' }
      if (data === 4) { return 'DisCharge' }
    },
    requestDBTimeout: function(diff, timeDelayUI) {
      timeDelayUI = timeDelayUI || 60000
      const eventTime = Date.now()
      this.getObjectData(this.query)

      setTimeout(() => {
        const nw = Date.now()
        const diff = nw - eventTime - timeDelayUI
        this.requestDBTimeout(diff, this.timeDelayUI)
        // console.log('requestDBTimeout', diff, timeDelayUI, diff)
      }, timeDelayUI - diff)
    }
  }
}
</script>
