<template>
  <div>
    <h1>Map</h1>
    <object :id="idObject" data="./src/icons/svg/russia_with_regions.svg" type="image/svg+xml"/>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      mapSvg: 0,
      idObject: 'svgMapObjectId'
    }
  },
  methods: {
    getObjectElement(object) {
      // подключаем объект
      const mapSvgObject = document.getElementById(object)
      // получаем содержимое объекта
      const objecDocument = mapSvgObject.contentDocument
      return objecDocument
    },
    clickSvgObject(id, idObject) {
      alert(id)
      const mapSvgObject = document.getElementById(idObject)
      var objecDocument = mapSvgObject.contentDocument
      objecDocument.getElementById(id).setAttribute('fill', '#5F2191')
    },
    iterationElementObject(object, idObject) {
      const path = object.querySelectorAll('path')
      for (let i = 0; i < path.length; i += 1) {
        const item = path[i]
        const id = item.getAttribute('id')
        // const title = item.getAttribute('title')
        item.setAttribute('fill', '#e0e0e0')
        item.addEventListener('click', () => { clickSvgObject(id, idObject) })
      }
    }
  }
}

// javascript
window.onload = function() {
  const idObject = 'svgMapObjectId'
  // подключаем элемент object
  const svgObject = getObjectElement(idObject)
  iterationElementObject(svgObject, idObject)
}

function getObjectElement(object) {
  // подключаем объект
  const mapSvgObject = document.getElementById(object)
  // получаем содержимое объекта
  const objecDocument = mapSvgObject.contentDocument
  return objecDocument
}

function clickSvgObject(id, idObject) {
  alert(id)
  const mapSvgObject = document.getElementById(idObject)
  var objecDocument = mapSvgObject.contentDocument
  objecDocument.getElementById(id).setAttribute('fill', '#5F2191')
}

function iterationElementObject(object, idObject) {
  const path = object.querySelectorAll('path')
  for (let i = 0; i < path.length; i += 1) {
    const item = path[i]
    const id = item.getAttribute('id')
    // const title = item.getAttribute('title')
    item.setAttribute('fill', '#f8f8f8')
    item.addEventListener('click', () => { clickSvgObject(id, idObject) })
  }
}

</script>
