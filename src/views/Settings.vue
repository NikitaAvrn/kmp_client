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
                <th class="hide-on-med-and-down">Дата, время</th>
                <th>ОС</th>
                <th>Браузер</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="session in SESSION_LIST" :key="session.datatime">
                <td class="hide-on-med-and-down">{{ session.datetime }}</td>
                <td><span class=""><i class="fab" :class="getIconOS(session)"></i></span>&nbsp;<span class="hide-on-med-and-down">{{ session.OS }} {{ session.OSVersion }}</span></td>
                <td><span class=""><i class="fab" :class="getIconBrowzer(session)"></i></span>&nbsp;<span class="hide-on-med-and-down">{{ session.browser }}</span> {{ session.browserVersion }}</td>
                <td>
                  <a href="#!" class="btn waves-effect white blue-text text-darken-3"><i class="material-icons">exit_to_app</i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </li>
      <li>
        <div class="collapsible-header"><i class="material-icons">color_lens</i>Цветовая тема</div>
        <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
      </li>
      <li>
        <div class="collapsible-header"><i class="material-icons">mode_comment</i>Подсказки</div>
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
  methods: {
    ...mapActions(['getSessions']),
    getIconOS(obj) {
      let icon
      switch(obj.OS) {
        case 'Windows':
          icon = 'windows'
          break
        case 'Linux':
          icon = 'linux'
          break
        case 'Linux Ubuntu':
          icon = 'ubuntu'
          break
        case 'Mac OS X':
          icon = 'apple'
          break
        case 'Android':
          icon = 'android'
          break
        case 'iOS':
          icon = 'apple'
          break
        default:
          icon = 'question'
      }
      return 'fa-' + icon
    },
    getIconBrowzer(obj) {
      let icon
      switch(obj.browser) {
        case 'Mozilla Firefox':
          icon = 'firefox-browser'
          break
        case 'Opera':
          icon = 'opera'
          break
        case 'Microsoft Internet Explorer':
          icon = 'internet-explorer'
          break
        case 'Microsoft Edge':
          icon = 'edge'
          break
        case 'Google Chrome':
          icon = 'chrome'
          break
        case 'Apple Safari':
          icon = 'safari'
          break
        default:
          icon = 'question'
      }
      return 'fa-' + icon
    }
  },
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
