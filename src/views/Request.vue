<template>
  <div>
    <div class="page-title hide-on-large-only">
      <h3>{{ $route.name }}</h3>
    </div>
    <div class="row">
      <div class="col s12">
        <ul id="tabs-swipe" class="tabs" ref="tabs">
          <li class="tab col s4">
            <a href="#form-request"
              >Заявка
              <span
                ><small>№{{ $route.query.number }}</small></span
              ></a
            >
          </li>
          <li class="tab col s4"><a href="#documents">Коносаменты</a></li>
          <li class="tab col s4" v-if="INVOICE">
            <a href="#invoice"
              >Счет <small>№ {{ INVOICE.number }}</small></a
            >
          </li>
        </ul>
      </div>
    </div>

    <div id="form-request" class="col s12">
      <form-request />
    </div>
    <div id="documents" class="col s12">
      <documents-request />
    </div>
    <div id="invoice" class="col s12" v-show="INVOICE">
      <invoice-request />
    </div>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large waves-effect waves-light green darken-1">
        <i class="large material-icons">save</i>
      </a>
    </div>
  </div>
</template>

<script>
import FormRequest from '../components/request/FormRequest.vue'
import utils from '@/utils/utils'
import DocumentsRequest from '../components/request/DocumentsRequest.vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import InvoiceRequest from '../components/request/InvoiceRequest.vue'

export default {
  metaInfo: {
    title: 'Редактирование заявки',
  },
  components: { FormRequest, DocumentsRequest, InvoiceRequest },
  computed: {
    ...mapGetters(['REQUEST_PROCCESSING', 'INVOICE']),
    swipeable() {
      return utils.isMobile()
    },
  },
  data: () => ({
    tabs: null,
  }),
  async mounted() {
    this.tabs = M.Tabs.init(this.$refs.tabs, {
      swipeable: this.swipeable,
    })
    this.CLR_REQUEST_PROCCESSING()
    this.CLR_INVOICE()
    if (!(await this.getRequestByNumber(this.$route.query.number))) {
      this.$router.push('/requests')
    }
    await this.getInvoicesRequest(this.$route.query.number)
  },
  beforeDestroy() {
    if (this.tabs && this.tabs.destroy) {
      this.tabs.destroy()
    }
  },
  methods: {
    ...mapMutations(['CLR_REQUEST_PROCCESSING', 'CLR_INVOICE']),
    ...mapActions(['getRequestByNumber', 'getInvoicesRequest']),
  },
}
</script>

<style></style>
