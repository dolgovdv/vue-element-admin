<template>
  <div class="about">
    <ul id="demo">
      <component-tree :item="treeData" class="item" @make-folder="makeFolder" @add-item="addItem"/>
    </ul>
    <!-- the demo root element -->
  </div>
</template>

<script>
import componentTree from './components/componentTree.vue'
import Vue from 'vue'

export default {
  name: 'Tree',
  components: {
    'component-tree': componentTree
  },
  props: {
    treeData: {
      type: Object,
      required: true
    }
  },
  methods: {
    makeFolder: function(item) {
      Vue.set(item, 'children', [])
      this.addItem(item)
    },
    addItem: function(item) {
      item.children.push({
        name: 'new stuff'
      })
    }
  }
}
</script>

<style>
body {
  font-family: Menlo, Consolas, monospace;
  color: #444;
}
.item {
  cursor: pointer;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
