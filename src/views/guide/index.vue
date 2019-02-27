<template>
  <div class="app-container">
    <p class="warn-content">
      {{ $t('guide.description') }}
      <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js.
      </a>
    </p>
    <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">{{ $t('guide.button') }}</el-button>
    <h1>test</h1>
    {{ count }}
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './defineSteps'

export default {
  name: 'Guide',
  data() {
    return {
      driver: null
    }
  },
  // add test
  computed: {
    count() {
      return this.$store.state.node.count
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    },
    // add test
    increment() {
      // this.store.commit('increment')
    },
    // add test
    decrement() {
      // this.store.commit('decrement')
    }
  }
}
</script>
