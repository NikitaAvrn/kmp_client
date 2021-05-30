<template>
  <div>
    <div class="page-title">
      <h3>{{ $route.name }}</h3>
    </div>
    <div class="row">
      <div class="col s12">
        <div class="row">
          <div class="input-field col s12 m6">
            <i class="material-icons prefix">directions_boat</i>
            <input type="text" id="ship" class="autocomplete" v-model="ship" />
            <label for="ship">Название т/х или рейс</label>
          </div>
          <div class="input-field col s12 m6">
            <i class="material-icons prefix">domain</i>
            <select multiple ref="select">
              <option value="" disabled>Выберете порт назначения</option>
              <option value="1">Петропавловск-Камчатский</option>
              <option value="2">Владивосток</option>
            </select>
            <label>Порт назначения</label>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col s12 m6 offset-m3">
          <div class="card">
            <div class="card-image">
              <img src="./../assets/img/Ivan_kapralov.jpg" />
              <span class="card-title">Иван Капралов</span>
            </div>
            <div class="card-content">
              <p>Рейс: 21056</p>
              <p>Маршрут: Владивосток → Петропавловск-Камчатский</p>
              <p>Приход во Владивосток: 29.05.2021</p>
              <p>Отход из Владивостока: 01.06.2021</p>
              <p>Приход в Петропавловск-Камчатский: 06.06.2021</p>
              <p>Отход из Петропавловска-Камчатского: 07.06.2021</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="row" v-for="(block, index) in docs" :key="index">
        <div class="col s12 m4" v-for="bol in block" :key="bol.number">
          <card-manifest :bol="bol" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils/card.utils'
import CardManifest from '../components/CardManifest.vue'

export default {
  components: { CardManifest },
  computed: {
    docs() {
      return utils.arrayCardTransform(this.bols, 3)
    },
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {})
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  data: () => ({
    select: null,
    ship: 'Иван Капралов 21056',
    bols: [
      {
        number: '741707КМП',
        container: 'CAXU6742696',
        seal: 'M7944261',
        weight: '4000',
        iso: '22G1',
        size: '20DC',
        temperature: '',
        ventilation: '',
        client: 'АО "ПОЧТА РОССИИ"',
        supplier: 'АО "ПОЧТА РОССИИ"',
        customer: 'МСЦ г.Владивосток - ОСП УФПС АО "Почта России"',
        address: 'г.Владивосток, ул.Верхнепортовая д.2, тел. 8-4232-41-33-77',
        status: 'Выгружен в порту назначения',
        out: 'Владивосток',
        in: 'Петропавловск-Камчатский',
        cargo: 'ПОЧТА',
        type: 'Каботаж',
        reil: '',
        request: '7459/21',
        requestDate: '20.05.2021',
        invoice: '7533/КМП',
        invoiceDate: '23.05.2021',
      },
      {
        number: '742272КМП',
        container: 'KUUU6020171',
        seal: 'м7486204',
        weight: '22000',
        iso: '22R1',
        size: '20RFHC',
        temperature: '6',
        ventilation: '30',
        client: 'ООО "ЛиТЭК"',
        supplier: 'ООО "ЛиТЭК"',
        customer: 'ИП Керимов Фикрет Бегляр Оглы',
        address: 'Камчатский край, г. Петропавловск-Камчатский, ул. Тушканова, д.5/1, кв. 27 8-924-783-67-77, 25-79-03',
        status: 'Выгружен в порту назначения',
        out: 'Владивосток',
        in: 'Петропавловск-Камчатский',
        cargo: 'ОГУРЦЫ СВЕЖИЕ',
        type: 'Каботаж',
        reil: '',
        request: '7620/21',
        requestDate: '18.05.2021',
        invoice: '7234/КМП',
        invoiceDate: '19.05.2021',
      },
    ],
  }),
}
</script>

<style></style>
