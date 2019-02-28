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
    {{ val }}
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './defineSteps'

import service from '@/utils/request.js'
// import axios from 'axios'

export default {
  name: 'Guide',
  data() {
    return {
      driver: null,
      val: ''
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
      // this.$store.commit('increment')
      this.$store.dispatch('increment')
      // console.log('service = ', service, 'axios = ', axios)
      // const getOject = {
      //   typeObject: 'object',
      //   nameObject: 'navidb.f_nodejs_get_tree("0001", 1)'
      // }
      // const getJSONObject = JSON.stringify(getOject)
      service({
        method: 'post',
        url: '/select',
        data: {
          typeObject: 'object',
          nameObject: 'navidb.f_nodejs_get_tree(\'0001\', 1)'
        }
      })
        .then(res => {
          return res.data[0]
        })
        .then(res => {
          this.val = res[0].nodename
          console.log('res = ', res[0].nodename)
        })
        .catch(err => {
          console.log('err = ', err)
        })
    },
    // add test
    decrement() {
      this.$store.dispatch('decrement')
    }
  }
}
</script>
