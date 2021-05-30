<template>
  <div class="card" :class="{ 'green lighten-5': invoice.payment >= invoice.summa, 'red lighten-5': invoice.payment < invoice.summa }">
    <div class="card-content black-text">
      <span class="card-title"
        >№{{ invoice.number }} <small>от {{ invoice.date }}</small></span
      >
      <p><span class="grey-text">Статус счета:</span> {{ invoice.status }}</p>
      <p><span class="grey-text">Контрагент:</span> {{ invoice.client }}</p>
      <p><span class="grey-text">Сумма по счету:</span> {{ invoice.summa | currency }}</p>
      <p><span class="grey-text">Оплачено:</span> {{ invoice.payment | currency }}</p>
      <p><span class="grey-text">Остаток:</span> {{ invoice.remainder | currency }}</p>
      <p>
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
        <li>
          <div class="collapsible-header"><i class="material-icons">comment</i>Комментарий к оплате</div>
          <div class="collapsible-body">
            {{ invoice.comment }}
          </div>
        </li>
      </ul>
    </div>
    <div class="card-action">
      <a href="#" class="black-text"><i class="material-icons left">print</i></a>
      <a href="#" class="black-text"><i class="material-icons left">download</i></a>
      <a href="#" class="black-text"><i class="material-icons left">email</i></a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['invoice'],
  data: () => ({
    collapsible: null,
  }),
  mounted() {
    this.collapsible = M.Collapsible.init(this.$refs.collapsible, {})
  },
}
</script>

<style>
.collapsible-btns {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
