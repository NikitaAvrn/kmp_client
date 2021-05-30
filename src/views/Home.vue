<template>
  <div>
    <div class="page-title">
      <h3>{{ $route.name }}</h3>
    </div>
    <div>
      <ul class="collapsible popout" ref="collapsible">
        <li>
          <div class="collapsible-header"><i class="material-icons">filter_drama</i>Счета</div>
          <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
        <li>
          <div class="collapsible-header"><i class="material-icons">place</i>Заявки</div>
          <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
        <li>
          <div class="collapsible-header"><i class="material-icons">whatshot</i>Коносаменты</div>
          <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
        <li>
          <div class="collapsible-header"><i class="material-icons">whatshot</i>Контейнеры</div>
          <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    collapsible: null,
  }),
  mounted() {
    this.collapsible = M.Collapsible.init(this.$refs.collapsible, {})
  },
  beforeDestroy() {
    if (this.collapsible && this.collapsible.destroy) {
      this.collapsible.destroy()
    }
  },
}
</script>
