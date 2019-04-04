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

    <h2>Состояние конвертора</h2>
    <table>
      <tbody>
        <tr>
          <td>
            <h3>Текущий режим</h3>
          </td>
          <td>
            <input :value="checkData(LocalObject.watt)" type="text" disabled="disabled">
          </td>
        </tr>
        <tr>
          <td>
            <h3>Выходная мощность(План), Вт</h3>
          </td>
          <td>
            <input :value="checkData(LocalObject.watt)" type="text" disabled="disabled">
          </td>
        </tr>
        <tr>
          <td>
            <h3>Выходная мощность(Факт), Вт</h3>
          </td>
          <td>
            <input :value="checkData(LocalObject.watt)" type="text" disabled="disabled">
          </td>
        </tr>
        <tr>
          <td>
            <h3>Выходная мощность, Вт</h3>
          </td>
          <td>
            <input :value="checkData(LocalObject.watt)" type="text" disabled="disabled">
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
            <input :value="checkData(LocalObject.watt)" type="text" disabled="disabled">
          </td>
        </tr>
        <tr>
          <td>
            <h3>Напряжение на батарее, В</h3>
          </td>
          <td>
            <input :value="checkData(LocalObject.watt)" type="text" disabled="disabled">
          </td>
        </tr>
        <tr>
          <td>
            <h3>Напряжение нагрузки, В</h3>
          </td>
          <td>
            <input :value="checkData(LocalObject.watt)" type="text" disabled="disabled">
          </td>
        </tr>
        <tr>
          <td>
            <h3>Ток нагрузки, А</h3>
          </td>
          <td>
            <input :value="checkData(LocalObject.watt)" type="text" disabled="disabled">
          </td>
        </tr>
        <tr>
          <td>
            <h3>Мощность, Вт</h3>
          </td>
          <td>
            <input :value="checkData(LocalObject.watt)" type="text" disabled="disabled">
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
            <input :value="checkData(LocalObject.watt)" type="text" disabled="disabled">
          </td>
        </tr>
        <tr>
          <td>
            <h3>Ток, А</h3>
          </td>
          <td>
            <input :value="checkData(LocalObject.watt)" type="text" disabled="disabled">
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
</template>

<script>
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
    },
    checkData(data) {
      return data || 'Нет данных'
    }
  }
}
</script>
