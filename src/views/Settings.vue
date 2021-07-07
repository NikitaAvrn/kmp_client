<template>
  <div>
    <div class="page-title hide-on-large-only">
      <h3>{{ $route.name }}</h3>
    </div>
    <ul class="collapsible" ref="collapsible">
      <li>
        <div class="collapsible-header"><i class="material-icons">filter_drama</i>Сессии</div>
        <div class="collapsible-body">
          <session-table />
        </div>
      </li>
      <li>
        <div class="collapsible-header"><i class="material-icons">color_lens</i>Интерфейс</div>
        <div class="collapsible-body">
          <h4>В разработке</h4>
          <p>Темная тема</p>
          <p>Подсказки</p>
          <p>Перелистываемые вкладки</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import SessionTable from '../components/SessionTable.vue'

export default {
  components: { SessionTable },
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

<style></style>
