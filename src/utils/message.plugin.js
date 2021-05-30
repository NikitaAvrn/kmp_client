export default {
  install(Vue, options) {
    Vue.prototype.$info = function(html) {
      if (!html) {
        return
      }
      const message = '<i class="material-icons">info</i>&nbsp;' + html
      M.toast({ html: message })
    }

    Vue.prototype.$error = function(html) {
      if (!html) {
        return
      }
      const message = '<i class="material-icons">error</i>&nbsp;' + html
      M.toast({ html: message })
    }

    Vue.prototype.$warning = function(html) {
      if (!html) {
        return
      }
      const message = '<i class="material-icons">warning</i>&nbsp;' + html
      M.toast({ html: message })
    }
  },
}
