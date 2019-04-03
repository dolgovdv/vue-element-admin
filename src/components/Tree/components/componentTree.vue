<template>
  <div>
    <!-- item template -->
    <li>
      <div
        :class="{ bold: isFolder, elementTree: !isFolder }"
        @click="toggle"
        @dblclick="passToPassport('/device/' + item.id)"
      >
        {{ item.name }}
        <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
      </div>
      <ul v-show="isOpen" v-if="isFolder">
        <component-tree
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          class="item"
          @make-folder="$emit('make-folder', $event)"
          @add-item="$emit('add-item', $event)"
        />
        <!-- <li class="add" @click="$emit('add-item', item)">+</li> -->
      </ul>
    </li>
  </div>
</template>

<script>
export default {
  name: 'ComponentTree',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      isOpen: false
    }
  },
  computed: {
    isFolder: function() {
      return this.item.children && this.item.children.length
    }
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen
      }
    },
    makeFolder: function() {
      if (!this.isFolder) {
        this.$emit('make-folder', this.item)
        this.isOpen = true
      }
    },
    passToPassport: function(path) {
      console.log('passToPassport =', this.item)
      this.$router.push('path')
    }
  }
}
</script>

<style>
.bold {
  font-weight: bold;
  background-color: #e6ffe6;
  border: rgba(53, 99, 51, 0.568) solid 2px;
  margin: 2px;
  border-radius: 5px;
  padding-left: 10px;
}
.item {
  cursor: pointer;
}
.elementTree{
  font-weight: bold;
  background-color: #e6ffff;
  border: rgba(53, 99, 51, 0.568) solid 2px;
  margin: 2px;
  border-radius: 5px;
  padding-left: 10px;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
