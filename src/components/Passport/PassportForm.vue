<template>
  <div>
    <div v-if="LocalData">
      <h1>
        {{ LocalData.title }}
      </h1>
      <form>
        <fieldset title="Расположение" class="group-parameter">
          <legend>Расположение</legend>

          <label for="solution">Решение</label>
          <input id="solution" v-model="LocalData.solution" type="text">

          <label for="area">Зона РСЭЭ</label>
          <input id="area" v-model="LocalData.area" type="text">

          <label for="region">Регион</label>
          <input id="region" v-model="LocalData.region" type="text">

          <label for="city">Город</label>
          <input id="city" v-model="LocalData.city" type="text">
        </fieldset>

        <fieldset title="Геоданные" class="group-parameter">
          <legend>Геоданные</legend>

          <label for="timezone_obj">Временна зона</label>
          <input id="timezone_obj" v-model="LocalData.timezone_obj" type="text">

          <label for="address">Адрес РСЭЭ</label>
          <input id="address" v-model="LocalData.address" type="text">

          <label for="latit">Широта</label>
          <input id="latit" v-model="LocalData.latit" type="text">

          <label for="longit">Долгота</label>
          <input id="longit" v-model="LocalData.longit" type="text">
        </fieldset>

        <fieldset class="group-parameter">
          <legend>Настройки оператора</legend>

          <p>Оператор</p>
          <input id="mts" v-model="LocalData.oper" type="checkbox" value="МТС">
          <label for="mts">МТС</label>

          <input id="tele2" v-model="LocalData.oper" type="checkbox" value="Теле 2">
          <label for="tele2">Теле 2</label>

          <input id="rtk" v-model="LocalData.oper" type="checkbox" value="РТК">
          <label for="rtk">РТК</label>

          <input id="beeline" v-model="LocalData.oper" type="checkbox" value="Билайн">
          <label for="beeline">Билайн</label>

          <input id="megafon" v-model="LocalData.oper" type="checkbox" value="Мегафон">
          <label for="megafon">Мегафон</label>

          <input id="other-operators" v-model="LocalData.oper" type="checkbox" value="Прочие">
          <label for="other-operators">Прочие</label>
        </fieldset>

        <fieldset class="group-parameter">
          <legend>Настройки</legend>

          <label for="serialnumber">Серийный номер</label>
          <input id="serialnumber" v-model="LocalData.serialnumber" type="text">

          <label for="nom_power">Номинальная мощность</label>
          <input id="nom_power" v-model="LocalData.nom_power" type="text">

          <label for="objcategory">Категория</label>
          <input id="objcategory" v-model="LocalData.objcategory" type="text">

          <label for="date_man">Дата производства</label>
          <input id="date_man" v-model="LocalData.date_man" type="text">

          <label for="hostip">Хост</label>
          <input id="hostip" v-model="LocalData.hostip" type="text">

          <label for="sysname">Имя в системе</label>
          <input id="sysname" v-model="LocalData.sysname" type="text">

          <label for="descr">Описание</label>
          <input id="descr" v-model="LocalData.descr" type="text">
        </fieldset>

        <fieldset class="group-parameter">
          <legend>Сетевые настройки</legend>

          <label for="ipaddress">ip адрес</label>
          <input id="ipaddress" v-model="LocalData.ipaddress" type="text">

          <label for="netmask">Маска</label>
          <input id="netmask" v-model="LocalData.netmask" type="text">

          <label for="dns">DNS</label>
          <input id="dns" v-model="LocalData.dns" type="text">

          <label for="gw">GateWay</label>
          <input id="gw" v-model="LocalData.gw" type="text">
        </fieldset>

        <fieldset class="group-parameter">
          <legend>Данные АКБ</legend>

          <label for="model">Модель АКБ</label>
          <input id="model" v-model="LocalData.model" type="text">

          <label for="version">Версия АКБ</label>
          <input id="version" v-model="LocalData.version" type="text">

        </fieldset>

        <button type="submit">Применить изменения</button>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PassportForm',
  props: {
    DeviceData: {
      type: [Array, Object],
      required: true
    }
  },
  data() {
    return {
      LocalData: {},
      arr: []
    }
  },
  created() {
    // Копируем данные в локальное состояние
    this.LocalData = Object.assign({}, this.DeviceData)
    this.LocalData.oper = [this.LocalData.oper]
    console.log('this.LocalData = ', this.LocalData, 'this.DeviceData = ', this.DeviceData)
  }
}
</script>

<style>
.group-parameter {
  margin-bottom: 20px;
}
</style>
