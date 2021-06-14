<template>
  <div>
    <div class="page-title">
      <h3>{{ $route.name }}</h3>
    </div>
    <ul class="collapsible" ref="collapsible">
      <li>
        <div class="collapsible-header"><i class="material-icons">filter_drama</i>Сессии</div>
        <div class="collapsible-body">
          <table class="centered" :class="{ striped: isMobile, highlight: !isMobile }">
            <thead>
              <tr>
                <th>ОС</th>
                <th>Браузер</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="session in SESSION_LIST" :key="session.datatime">
                <td>{{ session.OS }} {{ session.OSVersion }}</td>
                <td>{{ session.browser }} {{ session.browserVersion }}</td>
                <td>
                  <a href="#!" class="btn waves-effect white blue-text text-darken-3"><i class="material-icons">exit_to_app</i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </li>
      <li>
        <div class="collapsible-header"><i class="material-icons">place</i>Цветовая тема</div>
        <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
      </li>
      <li>
        <div class="collapsible-header"><i class="material-icons">whatshot</i>Подсказки</div>
        <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import utils from '@/utils/utils'

export default {
  computed: {
    ...mapGetters(['SESSION_LIST']),
    isMobile() {
      return utils.isMobile()
    },
  },
  methods: mapActions(['getSessions']),
  data: () => ({
    collapsible: null,
  }),
  mounted() {
    this.getSessions()
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
