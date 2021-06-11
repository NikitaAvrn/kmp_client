<template>
  <div>
    <div class="page-title">
      <h3>{{ $route.name }}</h3>
    </div>
    <loading v-if="loading" />
    <div v-else>
      <div class="row" v-for="(block, index) in inv" :key="index">
        <div class="col s12 m4" v-for="invoice in block" :key="invoice.number">
          <card-invoice :invoice="invoice" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CardInvoice from '../components/CardInvoice.vue'
import utils from '@/utils/card.utils'
import Loading from '../components/app/Loading.vue'

export default {
  components: { CardInvoice, Loading },
  computed: {
    ...mapGetters(['INVOICE_LIST']),
    inv() {
      return utils.arrayCardTransform(this.INVOICE_LIST, 3)
    },
  },
  data: () => ({
    loading: false,
  }),
  async mounted() {
    this.loading = true
    await this.getInvoices()
    this.loading = false
  },
  methods: {
    ...mapActions(['getInvoices']),
  },
}
</script>

<style></style>
