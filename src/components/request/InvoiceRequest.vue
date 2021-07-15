<template>
  <div>
    <loading v-show="!INVOICE" />
    <div v-if="INVOICE">
      <card-invoice-request :invoice="INVOICE" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from '../app/Loading.vue'
import CardInvoiceRequest from '../CardInvoiceRequest.vue'

export default {
  components: { Loading, CardInvoiceRequest },
  computed: {
    ...mapGetters(['INVOICE']),
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style></style>
