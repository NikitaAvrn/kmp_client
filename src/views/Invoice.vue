<template>
  <div>
    <div class="page-title hide-on-large-only">
      <h3>{{ $route.name }}</h3>
    </div>
    <loading v-if="loading" />
    <div v-else>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">search</i>
          <input id="icon_prefix" type="text" class="validate" v-model="find" />
          <label for="icon_prefix">Поиск по счетам</label>
        </div>
      </div>
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
//import InvoiceRequestVue from '../components/request/InvoiceRequest.vue'

export default {
  metaInfo: {
    title: 'Счета',
  },
  components: { CardInvoice, Loading },
  computed: {
    ...mapGetters(['INVOICE_LIST']),
    filterInvoices() {
      if (!this.INVOICE_LIST) {
        return []
      }
      if (this.find.length < 3 || !(this.INVOICE_LIST && this.INVOICE_LIST.length)) {
        return this.INVOICE_LIST
      }
      let find = this.find.toLowerCase()
      let invoices = this.INVOICE_LIST.filter((invoice) => {
        if (invoice.client && invoice.client.toLowerCase().includes(find)) {
          return true
        }
        if (invoice.comment && invoice.comment.toLowerCase().includes(find)) {
          return true
        }
        if (invoice.commentInvoice && invoice.commentInvoice.toLowerCase().includes(find)) {
          return true
        }
        if (invoice.customer && invoice.customer.toLowerCase().includes(find)) {
          return true
        }
        if (invoice.date && invoice.date.toLowerCase().includes(find)) {
          return true
        }
        if (invoice.manager && invoice.manager.toLowerCase().includes(find)) {
          return true
        }
        if (invoice.number && invoice.number.toLowerCase().includes(find)) {
          return true
        }
        if (
          invoice.payment &&
          String(invoice.payment)
            .toLowerCase()
            .includes(find)
        ) {
          return true
        }
        if (
          invoice.remainder &&
          String(invoice.remainder)
            .toLowerCase()
            .includes(find)
        ) {
          return true
        }
        if (invoice.request && invoice.request.toLowerCase().includes(find)) {
          return true
        }
        if (invoice.status && invoice.status.toLowerCase().includes(find)) {
          return true
        }
        if (
          invoice.summa &&
          String(invoice.summa)
            .toLowerCase()
            .includes(find)
        ) {
          return true
        }
        if (invoice.supplie && invoice.supplie.toLowerCase().includes(find)) {
          return true
        }

        return false
      })
      return invoices
    },
    inv() {
      return utils.arrayCardTransform(this.filterInvoices, 3)
    },
  },
  data: () => ({
    loading: false,
    find: '',
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
