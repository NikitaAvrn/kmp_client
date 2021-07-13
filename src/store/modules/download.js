export default {
  state: {
    link: '',
  },
  getters: {
    LINK: (s) => s.link,
  },
  mutations: {
    SET_LINK: (s, l) => (s.link = l),
    CLR_LINK: (s) => (s.link = ''),
  },
  actions: {
    async getInvoiceDownload({ commit, dispatch }, request) {
      try {
        const response = await dispatch('fetchGet', {
          url: `invoices/download/&number=${request}`,
        })
        if (response.success) {
          commit('SET_LINK', response.link)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getConosamentDownload({ commit, dispatch }, document) {
      try {
        const response = await dispatch('fetchGet', {
          url: `request/download/&document=${document}`,
        })
        if (response.success) {
          commit('SET_LINK', response.link)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
  },
}
