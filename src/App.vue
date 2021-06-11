<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
import { mapGetters, mapMutations } from 'vuex'
import messages from '@/utils/messages'

export default {
  computed: {
    ...mapGetters(['ERROR', 'MSG', 'STATUS']),
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
    message() {
      if (this.$route.query.message) {
        return this.$route.query.message
      }
    },
  },
  watch: {
    STATUS() {
      /* if (this.STATUS == 401) {
        this.$router.push('/login')
      } */
    },
    ERROR(e) {
      if (e.errors && e.errors.length) {
        e.errors.forEach((err) => {
          this.$error(err.msg)
        })
      } else if (e.message) {
        this.$error(e.message)
      }
    },
    MSG() {
      this.$info(this.MSG)
      this.CLR_MSG()
    },
    message(m) {
      if (!m) {
        return
      }
      if (messages[m]) {
        this.$info(messages[m])
      } else {
        this.$info(m)
      }
    },
  },
  methods: mapMutations(['CLR_MSG']),
  components: {
    EmptyLayout,
    MainLayout,
  },
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
