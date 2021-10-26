<template>
  <a href="#" class="black-text hide-on-med-and-down" @click.prevent="printInvoice"
    ><i class="material-icons" v-show="!loading">print</i><i class="material-icons spinner" v-show="loading">cached</i></a
  >
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['invoice'],
  computed: {
    ...mapGetters(['PRINT_CONTENT']),
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    ...mapActions(['getInvoicePrint']),
    async printInvoice() {
      this.loading = true
      await this.getInvoicePrint(this.invoice.request)
      let windowPrint = window.open(
        '_blank',
        'print-invoice',
        'left=50,top=50,width=1024,height=768,toolbar=0,location=yes,resizable=yes,scrollbars=yes,status=yes'
      )
      windowPrint.document.write('<title>Печать счета ' + this.invoice.number + ' от ' + this.invoice.date + '</title>')
      windowPrint.document.write('<link rel="stylesheet" href="http://340.ru/css/pr.css" type="text/css" />')
      windowPrint.document.write('<div>')
      windowPrint.document.write(this.PRINT_CONTENT)
      windowPrint.document.write('</div>')
      windowPrint.document.close()
      windowPrint.focus()
      windowPrint.onload = () => {
        windowPrint.print()
      }
      windowPrint.onafterprint = () => {
        windowPrint.close()
      }
      this.loading = false
    },
  },
}
</script>

<style></style>
