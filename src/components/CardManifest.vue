<template>
  <div class="card white">
    <div class="card-content black-text">
      <span class="card-title">{{ bol.number }}</span>
      <p v-show="bol.container"><span class="grey-text">Контейнер:</span> {{ bol.container }}</p>
      <p v-show="bol.seal"><span class="grey-text">Пломба:</span> {{ bol.seal }}</p>
      <p><span class="grey-text">Вес:</span> {{ bol.weight }}</p>
      <p v-show="bol.iso"><span class="grey-text">ISO:</span> {{ bol.iso }}</p>
      <p v-show="bol.size"><span class="grey-text">Типоразмер:</span> {{ bol.size }}</p>
      <p v-show="bol.temperature"><span class="grey-text">Температура:</span> {{ bol.temperature }}˚C</p>
      <p v-show="bol.ventilation"><span class="grey-text">Вентиляция:</span> {{ bol.ventilation }}%</p>
      <p><span class="grey-text">Контрагент:</span> {{ bol.client }}</p>
      <p><span class="grey-text">Отправитель:</span> {{ bol.supplier }}</p>
      <p><span class="grey-text">Получатель:</span> {{ bol.customer }}</p>
      <p><span class="grey-text">Адрес:</span> {{ bol.address }}</p>
      <p><span class="grey-text">Статус:</span> {{ bol.status }}</p>
      <p><span class="grey-text">Маршрут:</span> {{ bol.out }} &rarr; {{ bol.in }}</p>
      <p><span class="grey-text">Груз:</span> {{ bol.cargo }}</p>
      <p><span class="grey-text">Тип перевозки:</span> {{ bol.type }}</p>
      <p v-show="bol.reil"><span class="grey-text">Ж/д накладная:</span> {{ bol.reil }}</p>
      <p>
        <span class="grey-text">Заявка:</span> {{ bol.request }} <small>от {{ bol.requestDate }}</small>
      </p>
      <p>
        <span class="grey-text">Счет:</span> {{ bol.invoice }} <small>от {{ bol.invoiceDate }}</small>
      </p>
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
  props: ['bol'],
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
