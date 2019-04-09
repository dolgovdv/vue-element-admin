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

      <div v-if="LocalObject.agent">
        <h2>Состояние конвертора</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <h3>Текущий режим</h3>
              </td>
              <td>
                <input :value="modeConvert(DataLocalObject.mode)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Выходная мощность(План), Вт</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject.p_fset)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Выходная мощность(Факт), Вт</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject.p_fset)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Выходная мощность, Вт</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject.p_result)" type="text" disabled="disabled">
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
                <input :value="checkData(DataLocalObject.u_batt)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Напряжение нагрузки, В</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject.u_load)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Ток нагрузки, А</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject.i_total)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Мощность, Вт</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject.p_result)" type="text" disabled="disabled">
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
                <input :value="checkData(DataLocalObject.u_batt_1)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Ток, А</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject.i_batt_1)" type="text" disabled="disabled">
              </td>
            </tr>
            <tr>
              <td>
                <h3>Мощность, Вт</h3>
              </td>
              <td>
                <input :value="checkData(DataLocalObject.p_batt_1)" type="text" disabled="disabled">
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
      DataLocalObject: {}
    }
  },
  computed: {
    query() {
      return 'statistic.f_view_statistic_by_obj_nodejs(' + this.LocalObject.id + ')'
    },
    pfset() {
      return this.DataLocalObject.p_fset
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
          // console.log('res', res.data[0])
          this.changeInputData(res.data[0])
          return res.data[0]
        })
        .catch(err => {
          console.log('err = ', err)
        })
    },
    // добавление примеси для реактивности
    changeInputData(data) {
      // console.log('changeInputData =', data)
      data.map((item, i, arr) => {
        this.$set(this.DataLocalObject, item.series, item.y)
        // console.log('changeInputData DataLocalObject =', this.DataLocalObject)
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
      // console.log('requestDBTimeout')

      setTimeout(() => {
        const nw = Date.now()
        const diff = nw - eventTime - timeDelayUI
        this.requestDBTimeout(diff, this.timeDelayUI)
      }, timeDelayUI - diff)
    }
  }
}
</script>
