<template>
  <div>
    <loading v-show="!INVOICE" />
    <div>
      <card-invoice-request :invoice="INVOICE" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from '../app/Loading.vue'
import CardInvoiceRequest from '../CardInvoiceRequest.vue'

export default {
  props: ['number'],
  components: { Loading, CardInvoiceRequest },
  computed: {
    ...mapGetters(['INVOICE']),
  },
  methods: {
    ...mapActions(['getInvoicesRequest'])
  },
  mounted() {
    this.getInvoicesRequest(this.number)
  }
}
</script>

<style></style>
