<template>
  <div class="card z-depth-3">
    <div class="card-content black-text">
      <span class="card-title"
        >№{{ invoice.number }} <small>от {{ invoice.date }}</small></span
      >
      <p><span class="grey-text">Поставщик:</span> {{ invoice.supplier }}</p>
      <p><span class="grey-text">Покупатель:</span> {{ invoice.customer }}</p>
      <p><span class="grey-text">Комментарий:</span> {{ invoice.commentInvoice }}</p>
      <p :class="{ 'green lighten-5': invoice.payment >= invoice.summa, 'red lighten-5': invoice.payment < invoice.summa }">
        <span>Статус счета:</span> {{ invoice.status }}
      </p>
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
      <buttons-invoice :invoice="invoice" />
    </div>
  </div>
</template>

<script>
import DownloadProgress from './app/DownloadProgress.vue'
import ButtonsInvoice from './ButtonsInvoice.vue'

export default {
  components: { DownloadProgress, ButtonsInvoice },
  props: ['invoice'],
  data: () => ({
    collapsible: null,
  }),
  mounted() {
    this.collapsible = M.Collapsible.init(this.$refs.collapsible, {})
  },
}
</script>

<style></style>
