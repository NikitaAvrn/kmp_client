<template>
  <div>
    <table class="centered" :class="{ striped: isMobile, highlight: !isMobile }">
      <thead>
        <tr>
          <th class="hide-on-med-and-down">Дата, время</th>
          <th>ОС</th>
          <th>Браузер</th>
          <th class="hide-on-med-and-down">IP</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="session in SESSION_LIST" :key="session.sid">
          <td class="hide-on-med-and-down">{{ session.datetime }}</td>
          <td>
            <span class=""><i class="fab" :class="getIconOS(session)"></i></span>&nbsp;<span class="hide-on-med-and-down">{{ session.OS }} {{ session.OSVersion }}</span>
          </td>
          <td>
            <span class=""><i class="fab" :class="getIconBrowzer(session)"></i></span>&nbsp;<span class="hide-on-med-and-down">{{ session.browser }}</span> {{ session.browserVersion }}
          </td>
          <td>{{ session.ip }}</td>
          <td>
            <a href="#!" class="btn waves-effect white blue-text text-darken-3" v-if="session.sid != SID" @click="closeSession(session)"><i class="material-icons">exit_to_app</i></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import utils from '@/utils/utils'

export default {
  computed: {
    ...mapGetters(['SESSION_LIST', 'SID']),
    isMobile() {
      return utils.isMobile()
    },
  },
  methods: {
    ...mapActions(['getSessions', 'deleteSessionBySid']),
    getIconOS(obj) {
      let icon
      switch (obj.OS) {
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
      switch (obj.browser) {
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
    },
    closeSession(event) {
      this.deleteSessionBySid({ sessionId: event.sid })
    },
  },
  mounted() {
    this.getSessions()
  },
}
</script>

<style></style>
