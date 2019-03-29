<template>
  <div>
    <h1>{{ LocalObject.title_rus }}</h1>

    <table>
      <tbody>
        <tr>
          <td>
            <h3>Место расположения</h3>
          </td>
          <td>
            <input :value="LocalObject.address" type="text" disabled="disabled">
          </td>
        </tr>
        <tr>
          <td>
            <h3>Серийный номер</h3>
          </td>
          <td>
            <input :value="LocalObject.serialnumber" type="text" disabled="disabled">
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

  </div>
</template>

<script>
export default {
  name: 'DeviceForm',
  props: {
    DeviceData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      LocalObject: {}
    }
  },
  created() {
    // Копируем пользователя в локальное состояние
    this.LocalObject = Object.assign({}, this.DeviceData[0])
    console.log('this.LocalObject = ', this.LocalObject, 'this.DeviceData = ', this.DeviceData)
  },
  methods: {
    installAgent(agent) {
      return agent || 'Агент не установлен'
    }
  }
}
</script>
