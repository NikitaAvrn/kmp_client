<template>
  <div class="row">
    <div class="input-field col s12">
      <i class="material-icons prefix">date_range</i>
      <input :id="`component-date-${this._uid}`" type="text" v-model="dateModel" class="datepicker" ref="datepicker" />
      <label :for="`component-date-${this._uid}`">{{ label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'label', 'defaultDate', 'readonly'],
  data: () => ({
    datepicker: null,
    dateModel: null,
  }),
  mounted() {
    this.datepicker = M.Datepicker.init(this.$refs.datepicker, {
      autoClose: true,
      format: 'dd mmm yyyy',
      defaultDate: new Date(Date.parse(this.defaultDate)),
      firstDay: 1,
      setDefaultDate: true,
      disableWeekends: false,
      onSelect: (value) => {
        this.$emit('input', value)
      },
      i18n: {
        cancel: 'Отмена',
        clear: 'Очистить',
        done: 'Принять',
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['Янв.', 'Фев.', 'Мар.', 'Апр.', 'Май', 'Июн.', 'Июл.', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'],
        weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        weekdaysShort: ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'],
        weekdaysAbbrev: ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'],
      },
    })
  },
  destroyed() {
    if (this.datepicker && this.datepicker.destroy) {
      this.datepicker.destroy()
    }
  },
  watch: {
    value() {
      if (this.value) {
        this.dateModel = new Intl.DateTimeFormat('ru-RU', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }).format(new Date(this.value))
      } else {
        this.dateModel = ''
      }
    },
  },
}
</script>

<style></style>
