<template>
  <div>
    <div v-if="LocalData">
      <h1>
        Пасспорт: {{ LocalData.title }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PassportForm',
  props: {
    DeviceData: {
      type: [Array, Object],
      required: true
    }
  },
  data() {
    return {
      LocalData: {}
    }
  },
  created() {
    // Копируем пользователя в локальное состояние
    this.LocalData = Object.assign({}, this.DeviceData)
    console.log('this.LocalData = ', this.LocalData, 'this.DeviceData = ', this.DeviceData)
  }
}
</script>
