<template>
  <div :style="{height:height,width:width}">
    <h1>Map</h1>
    <object data="./src/icons/svg/russia_with_regions.svg" type="image/svg+xml"/>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      mapSvg: 0
    }
  }
}
</script>
