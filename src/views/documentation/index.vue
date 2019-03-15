<template>
  <div class="about">
    <h1>Tree</h1>
    <button type="button" @click="getFilterGeo()">Сортировка по расположению</button>
    <button type="button" @click="getFilterZone()">Сортировка по зонам</button>
    <div class="viewTree">
      <object-tree :tree-data="treeData" />
    </div>
  </div>
</template>

<script>

import service from '@/utils/request.js'
import ObjectTree from '@/components/Tree'

// demo data
const treeData = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'wat' }]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'wat' }]
        }
      ]
    }
  ]
}

export default {
  name: 'Tree',
  components: {
    'object-tree': ObjectTree
  },
  data: function() {
    return {
      treeData: treeData
    }
  },
  methods: {
    getFilterGeo() {
      this.connectToDataBase('navidb.f_nodejs_get_tree111(\'0001\', 1)')
    },
    getFilterZone() {
      this.connectToDataBase('navidb.f_nodejs_get_tree111(\'0001\', 2)')
    },
    connectToDataBase: function(filterName) {
      filterName = filterName || 'navidb.f_nodejs_get_tree111(\'0001\', 1)'
      // console.log('filterName =', filterName)
      service({
        method: 'post',
        url: '/select',
        data: {
          typeObject: 'object',
          nameObject: filterName
          // nameObject: 'public.test'
        }
      })
        .then(res => {
          // console.log('res', res.data[0])
          this.getDataForTree(res.data[0])
          return res.data[0]
        })
        .catch(err => {
          console.log('err = ', err)
        })
    },
    // getPostSelectListTreeDB: function(filter) {
    //   console.log('getPostSelectListTreeDB')
    //   // если фильтер не задан, то присваивается значение по умолчанию
    //   filter = filter || "navidb.f_nodejs_get_tree('0001', 1)";
    //   getPostSelectDB(filter)
    //     .then(res => {
    //       console.log('res =', res)

    //       var input = res

    //       var data = getDataForTree(input)
    //       var listTree = getDataForTree(input)

    //       console.log('data =', data)
    //       callVue(listTree[0])

    //       return data
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       return
    //     })
    // },
    getDataForTree: function(input) {
      // console.log('getDataForTree')
      // принимает исходный массив
      function group(arr) {
        return arr.reduce(function(acc, it) {
          return ((acc[it.parent_path] = acc[it.parent_path] || []).push(it), acc)
        }, {})
      }

      function buildTreeInGr(arr, grouped) {
        arr.forEach(function(it) {
          it.children = grouped[it.path] || []
        })
      }
      const gr = group(input)
      buildTreeInGr(input, group(input))

      var data = gr['']
      this.treeData = data[0]
      return data
    }
  }
}
</script>

<style>
  .viewTree {
    width: 300px;
  }
</style>
