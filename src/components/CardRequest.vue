<template>
  <div class="card white z-depth-3">
    <div class="card-content black-text">
      <div class="card-clickable" @click="clickCard(request.number)">
        <span class="card-title"
          >№{{ request.number }} <small>от {{ request.date }}</small></span
        >
        <p><span class="grey-text">Статус заявки:</span> {{ request.status }}</p>
        <p><span class="grey-text">Маршрут:</span> {{ request.out }} &rarr; {{ request.in }}</p>
        <p><span class="grey-text">Груз:</span> {{ request.cargo }}</p>
        <p><span class="grey-text">Тип перевозки:</span> {{ request.type }}</p>
        <p><span class="grey-text">Менеджер:</span> {{ request.manager }}</p>
      </div>
      <ul class="collapsible z-depth-0" ref="collapsible">
        <li>
          <div class="collapsible-header"><i class="material-icons">insert_drive_file</i>Коносаменты</div>
          <div class="collapsible-body">
            <div v-for="(doc, inx) in request.documents" :key="doc.document">
              <p><span class="grey-text">Коносамент:</span> {{ doc.document }}</p>
              <p v-show="doc.container"><span class="grey-text">Контейнер:</span> {{ doc.container }}</p>
              <p v-show="doc.container"><span class="grey-text">Типоразмер:</span> {{ doc.size }}</p>
              <p v-show="!doc.container">
                <span class="grey-text">Груз:</span> {{ doc.cargo }} <small v-show="doc.cargoadd">({{ doc.cargoadd }})</small>
              </p>
              <p><span class="grey-text">Статус:</span> {{ doc.status }}</p>
              <p v-show="doc.ship">
                <span class="grey-text">Т/х:</span> {{ doc.ship }} <small>({{ doc.flight }})</small>
              </p>
              <buttons-conosament :document="doc.document" />
              <div class="divider" v-if="inx + 1 < request.documents.length"></div>
            </div>
          </div>
        </li>
        <li>
          <div class="collapsible-header" v-show="request.invoice.date"><i class="material-icons">local_atm</i>Счет</div>
          <div
            class="collapsible-body"
            :class="{ 'green lighten-5': request.invoice.payment >= request.invoice.summa, 'red lighten-5': request.invoice.payment < request.invoice.summa }"
          >
            <div>
              <p><span class="grey-text">Статус счета:</span> {{ request.invoice.status }}</p>
              <p>
                <span class="grey-text">Счет:</span> {{ request.invoice.number }} <small>от {{ request.invoice.date }}</small>
              </p>
              <p><span class="grey-text">Сумма по счету:</span> {{ request.invoice.summa | currency }}</p>
              <buttons-invoice :invoice="request.invoice" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ButtonsConosament from './ButtonsConosament.vue'
import ButtonsInvoice from './ButtonsInvoice.vue'
export default {
  components: { ButtonsConosament, ButtonsInvoice },
  props: ['request'],
  data: () => ({
    collapsible: null,
  }),
  mounted() {
    this.collapsible = M.Collapsible.init(this.$refs.collapsible, {})
  },
  beforeDestroy() {
    if (this.collapsible && this.collapsible.destroy) {
      this.collapsible.destroy()
    }
  },
  methods: {
    clickCard(req) {
      this.$router.push(`/request?number=${req}`)
    },
  },
}
</script>

<style scoped>
.collapsible-btns {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.card-clickable {
  cursor: pointer;
}
</style>
