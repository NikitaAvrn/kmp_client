export default {
  state: {
    print: '',
  },
  getters: {
    PRINT_CONTENT: (s) => s.print,
  },
  mutations: {
    SET_PRINT_CONTENT: (s, p) => (s.print = p),
    CLR_PRINT_CONTENT: (s) => (s.print = ''),
  },
  actions: {
    async getInvoicePrint({ commit, dispatch }, request) {
      try {
        const response = await dispatch('fetchGet', {
          url: `invoices/print/&number=${request}`,
        })
        if (response.success) {
          commit('SET_PRINT_CONTENT', response.print)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getConosamentPrint({ commit, dispatch }, document) {
      try {
        const response = await dispatch('fetchGet', {
          url: `request/print/&document=${document}`,
        })
        if (response.success) {
          commit('SET_PRINT_CONTENT', response.print)
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
