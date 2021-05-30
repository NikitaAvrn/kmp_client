<template>
  <div>
    <div class="page-title">
      <h3>{{ $route.name }}</h3>
    </div>
    <div>
      <div class="row" v-for="(block, index) in inv" :key="index">
        <div class="col s12 m4" v-for="invoice in block" :key="invoice.number">
          <card-invoice :invoice="invoice" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardInvoice from '../components/CardInvoice.vue'
import utils from '@/utils/card.utils'

export default {
  components: { CardInvoice },
  computed: {
    inv() {
      return utils.arrayCardTransform(this.invoices, 3)
    },
  },
  data: () => ({
    invoices: [
      {
        number: '7093/КМП',
        date: '18.05.2021',
        request: '7842/21',
        dateRequest: '17.05.2021',
        summa: '165000.00',
        payment: '165000.00',
        remainder: '0.00',
        comment:
          '4043 от 24.05.2021 (ПО ДОГ. 5/19/КМП ОТ 11.01.2019 0:0000 ПО СЧ 7093/КМП ОТ 18.05.21, 7108/КМП ОТ 18.05.21, 7097/КМП ОТ 18.05.21, 7105/КМП ОТ 18.05.21, 7104/КМПОТ 18.05.21 - ОРГАНИЗАЦИЯ ПЕРЕ ВОЗКИ В Т.Ч. НДС (20%) 82500-00)',
        client: 'ФИТ, ООО',
        status: 'Счет оплачен',
        commentInvoice:
          'Cогласно заявки клиента № 7842 / 21 от 17.05.2021 по договору организации перевозки № 5/19/КМП от 11.01.2019 Рейс 21056 ИВАН КАПРАЛОВ 17.05.2021 из Влд. . Перевозка из (пункт отгрузки) г. Владивосток в (пункт назначения) г. П-Камчатский (ПСЖВС - прямое смешанное железнодорожно-морское сообщение). Контейнеры TEMU2609408, TCLU2708321, FESU2127390 по коносаментам 742800КМП ( ждн: ЭЫ030928), 742801КМП ( ждн: ЭЫ424713), 742802КМП ( ждн: АР010841)',
        manager: 'Козко И.В.',
      },
    ],
  }),
}
</script>

<style></style>
