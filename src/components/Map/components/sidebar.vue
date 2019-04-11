<template>
  <div>

    <div >
      <button
        v-for="tab in TabsComponents"
        :key="tab.name"
        :class="['tab-button', { active: currentTab.name === tab.name }]"
        @click="currentTab = tab"
      >{{ tab.title }}</button>

      <component
        :is="currentTab.name"
        :id-data="idData"
        class="tab"
      />
    </div>

  </div>
</template>

<script>

// import service from '@/utils/request.js'
import InfoSideBar from '@/components/Map/components/infoSideBar.vue'
import PassportSideBar from '@/components/Map/components/passportSideBar.vue'

export default {
  name: 'SideBarMap',
  components: {
    'info-side-bar': InfoSideBar,
    'passport-side-bar': PassportSideBar
  },
  props: {
    idData: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      TabsComponents: [{ name: 'info-side-bar', title: 'Мониторинг' }, { name: 'passport-side-bar', title: 'Паспорт' }],
      currentTab: {}
    }
  },
  // метоб find
  // computed: {
  //   currentTab() {
  //     return this.TabsComponents[0].find(t => t.active === true)
  //   }
  // }
  created() {
    this.currentTab = this.TabsComponents[0]
  }
}
</script>

<style>
.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #c0e9bf;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
