<template>
  <div class="card z-depth-3">
    <div class="card-content black-text">
      <span class="card-title"
        >№{{ invoice.number }} <small>от {{ invoice.date }}</small></span
      >
      <p><span class="grey-text">Поставщик:</span> {{ invoice.supplier }}</p>
      <p><span class="grey-text">Покупатель:</span> {{ invoice.customer }}</p>
      <p><span class="grey-text">Комментарий:</span> {{ invoice.commentInvoice }}</p>
      <p :class="{ 'green lighten-5': invoice.payment >= invoice.summa, 'red lighten-5': invoice.payment < invoice.summa }"><span>Статус счета:</span> {{ invoice.status }}</p>
      <p><span class="grey-text">Клиент:</span> {{ invoice.client }}</p>
      <p><span class="grey-text">Сумма по счету:</span> {{ invoice.summa | currency }}</p>
      <p><span class="grey-text">Оплачено:</span> {{ invoice.payment | currency }}</p>
      <p><span class="grey-text">Остаток:</span> {{ invoice.remainder | currency }}</p>
      <p v-show="invoice.request">
        <span class="grey-text">Заявка:</span> {{ invoice.request }} <small>от {{ invoice.dateRequest }}</small>
      </p>
      <p><span class="grey-text">Менеджер:</span> {{ invoice.manager }}</p>
      <ul class="collapsible z-depth-0" ref="collapsible">
        <li>
          <div class="collapsible-header"><i class="material-icons">chat</i>Комментарий к счету</div>
          <div class="collapsible-body">
            {{ invoice.commentInvoice }}
          </div>
        </li>
        <li v-show="invoice.comment">
          <div class="collapsible-header"><i class="material-icons">comment</i>Комментарий к оплате</div>
          <div class="collapsible-body">
            {{ invoice.comment }}
          </div>
        </li>
      </ul>
    </div>
    <download-progress ref="downloadTimer" />
    <div class="card-action">
      <a href="#" class="black-text hide-on-med-and-down" @click.prevent="printInvoice(invoice)"><i class="material-icons left">print</i></a>
      <a href="#" class="black-text" @click.prevent="downloadInvoice(invoice)"><i class="material-icons left">download</i></a>
      <a href="#" class="black-text"><i class="material-icons left">email</i></a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DownloadProgress from './app/DownloadProgress.vue'

export default {
  components: { DownloadProgress },
  props: ['invoice'],
  data: () => ({
    collapsible: null,
  }),
  mounted() {
    this.collapsible = M.Collapsible.init(this.$refs.collapsible, {})
  },
  computed: {
    ...mapGetters(['PRINT_CONTENT', 'LINK']),
  },
  methods: {
    ...mapActions(['getInvoicePrint', 'getInvoiceDownload']),
    async printInvoice(invoice) {
      this.$refs.downloadTimer.start(1000)
      await this.getInvoicePrint(invoice.request)

      let windowPrint = window.open('_blank', 'print-invoice', 'left=50,top=50,width=1024,height=768,toolbar=0,location=yes,resizable=yes,scrollbars=yes,status=yes')
      windowPrint.document.write('<title>Печать счета ' + invoice.number + ' от ' + invoice.date + '</title>')
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
    },
    async downloadInvoice(invoice) {
      this.$refs.downloadTimer.start(10000)
      await this.getInvoiceDownload(invoice.request)
      setTimeout(() => {
        let fileLink = document.createElement('a')
        fileLink.href = this.LINK
        fileLink.target = '_blink'
        fileLink.setAttribute('download', 'on')
        document.body.appendChild(fileLink)
        fileLink.click()
      }, 10000)
    }
  },
}
</script>

<style>
.card-action {
  display: flex;
  justify-content: center;
  margin-left: 1rem;
}
</style>
