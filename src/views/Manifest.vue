<template>
  <div>
    <div class="page-title hide-on-large-only">
      <h3>{{ $route.name }}</h3>
    </div>
    <div class="row">
      <div class="col s12">
        <ship-flight minlength="3" @select-flight="selectFlight" />
      </div>
    </div>
    <div class="row" v-show="PORTS && PORTS.length">
      <div class="input-field col s12">
        <i class="material-icons prefix">domain</i>
        <select multiple v-model="selectPort" ref="select">
          <option value="" disabled>Выберете порт назначения</option>
          <option v-for="port in PORTS" :key="port.code" :value="port.code">{{ port.title }}</option>
        </select>
        <label>Порт назначения</label>
      </div>
    </div>
    <loading v-show="loading" />
    <div v-if="PORTS && PORTS.length">
      <div class="row">
        <div class="col s12 m6 offset-m3">
          <div class="card">
            <div class="card-image">
              <img src="./../assets/img/Ivan_kapralov.jpg" />
              <span class="card-title">{{ FLIGHT.title }}</span>
            </div>
            <div class="card-content">
              <p>Рейс: {{ FLIGHT.flight }}</p>
              <p>Маршрут: {{ FLIGHT.ports[0].title }} → {{ FLIGHT.ports[1].title }}</p>
              <p>Приход во {{ FLIGHT.ports[0].title }}: {{ FLIGHT.ports[0].in }}</p>
              <p>Отход из {{ FLIGHT.ports[0].title }}: {{ FLIGHT.ports[0].out }}</p>
              <p>Приход в {{ FLIGHT.ports[1].title }}: {{ FLIGHT.ports[1].in }}</p>
              <p>Отход из {{ FLIGHT.ports[1].title }}: {{ FLIGHT.ports[1].out }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="docs">
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
import ShipFlight from '../components/app/ShipFlight.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Loading from '../components/app/Loading.vue'

export default {
  metaInfo: {
    title: 'Манифесты',
  },
  components: { CardManifest, ShipFlight, Loading },
  computed: {
    ...mapGetters(['DOCUMENTS', 'PORTS', 'FLIGHT']),
    docs() {
      if (!this.DOCUMENTS || !this.selectPort) {
        return []
      }
      const arr = this.DOCUMENTS.filter((d) => this.selectPort.includes(d.inCode))
      return utils.arrayCardTransform(arr, 3)
    },
  },
  mounted() {
    this.CLR_DOCUMENTS()
    this.CLR_FLIGHT()
    this.CLR_PORTS()
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  data: () => ({
    select: null,
    ship: null,
    loading: false,
    selectPort: [],
  }),
  methods: {
    ...mapActions(['getManifest']),
    ...mapMutations(['CLR_DOCUMENTS', 'CLR_PORTS', 'CLR_FLIGHT']),
    async selectFlight(event) {
      this.loading = true
      await this.getManifest(event)
      this.loading = false
      this.initPorts()
    },
    initPorts() {
      this.select = M.FormSelect.init(this.$refs.select, {})
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
  },
}
</script>

<style></style>
