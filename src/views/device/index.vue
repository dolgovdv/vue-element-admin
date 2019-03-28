<template>

  <div>
    <h1>
      Название устройства - {{ id }}
    </h1>
  </div>

</template>

<script>
export default {
  name: 'DevicePanel',
  computed: {
    id() {
      return this.$route.params.id
    }
  }
}
</script>

