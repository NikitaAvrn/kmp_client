<template>
  <div class="btns-invoice">
    <button-print-invoice :invoice="invoice" />
    <button-download-invoice :invoice="invoice" />
  </div>
</template>

<script>
import ButtonDownloadInvoice from './ButtonDownloadInvoice.vue'
import ButtonPrintInvoice from './ButtonPrintInvoice.vue'
export default {
  props: ['invoice'],
  components: { ButtonPrintInvoice, ButtonDownloadInvoice },
}
</script>

<style>
.btns-invoice {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}
</style>
