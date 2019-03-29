<template>
  <div>
    <h1>DeviceForm</h1>
    <input :value="LocalObject.address" type="text">
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
  }
}
</script>

