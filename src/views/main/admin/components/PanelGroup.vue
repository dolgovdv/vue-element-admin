<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <h2 class="header-card">Объекты</h2>
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="settings" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Установ.</div>
          <count-to :start-val="0" :end-val="installDevice" :duration="2600" class="card-panel-num"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">На связи</div>
          <count-to :start-val="0" :end-val="connectDevice" :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <h2 class="header-card">Мощность</h2>
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="renewable-energy" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Потребл.</div>
          <count-to :start-val="0" :end-val="powerConsumption" :duration="2600" class="card-panel-num"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Компенс.</div>
          <count-to :start-val="0" :end-val="powerСompensation" :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <h2 class="header-card">Емкость</h2>
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="battery" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Установлен.</div>
          <count-to :start-val="0" :end-val="capacityInstall" :duration="2600" class="card-panel-num"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Рабочая</div>
          <count-to :start-val="0" :end-val="capacityWork" :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <h2 class="header-card">Аварии</h2>
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="alarm" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Активные</div>
          <count-to :start-val="0" :end-val="alarmActive" :duration="2600" class="card-panel-num"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Всего</div>
          <count-to :start-val="0" :end-val="alarmAll" :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <!--
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Purchases</div>
          <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Shoppings</div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    -->
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

// add database
import service from '@/utils/request.js'

export default {
  components: {
    CountTo
  },
  data: function() {
    return {
      installDevice: 0,
      connectDevice: 0,
      powerConsumption: 0,
      powerСompensation: 0,
      capacityInstall: 0,
      capacityWork: 0,
      alarmActive: 0,
      alarmAll: 0
    }
  },
  mounted() {
    service({
      method: 'post',
      url: '/select',
      data: {
        typeObject: 'object',
        // nameObject: 'inventorydb.f_nodejs_get_obj_info()'
        nameObject: 'public.test'
      }
    })
      .then(res => {
        return res.data[0]
      })
      .then(res => {
        // разбираем массив на один объект
        const objdata = res.reduce((obj, item) => {
          // добавляем в объект obj новый элемент
          // console.log('item = ', item, 'obj = ', obj)
          obj[item.name] = item.value
          return obj
        }, {})
        // console.log('objdata =', objdata)
        // деструктуризация объекта
        const {
          connectDevice = 0,
          installDevice = 0,
          powerConsumption = 0,
          powerСompensation = 0,
          capacityInstall = 0,
          capacityWork = 0,
          alarmActive = 0,
          alarmAll = 0
        } = objdata
        // передать значения в компонент?!
        this.connectDevice = connectDevice
        this.installDevice = installDevice
        this.powerConsumption = powerConsumption
        this.powerСompensation = powerСompensation
        this.capacityInstall = capacityInstall
        this.capacityWork = capacityWork
        this.alarmActive = alarmActive
        this.alarmAll = alarmAll
        // console.log('obj = ', res[0].obj, 'dev = ', res[0].dev)
        // return res[0].obj
      })
      .catch(err => {
        console.log('err = ', err)
      })
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    text-align: center;
    min-height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 0px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
      margin-top: 0px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 8px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
      .header-card {
        margin-top: 5px;
        margin-bottom: 0px;
        text-align: center;
      }
    }
  }
}
</style>
