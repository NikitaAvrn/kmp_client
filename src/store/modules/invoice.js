export default {
  state: {
    invoices: [],
    invoice: {}
  },
  getters: {
    INVOICE_LIST: (s) => s.invoices,
    INVOICE: (s) => s.invoice,
  },
  mutations: {
    SET_INVOICE_LIST: (s, l) => (s.invoices = l),
    CLR_INVOICE_LIST: (s) => (s.invoices = []),
    DEL_INVOICE: (s, req) => {
      let index = s.invoices.findIndex((invoices) => req._id === invoices._id)
      s.invoices.splice(index, 1)
    },
    SET_INVOICE: (s, i) => (s.invoice = i),
    CLR_INVOICE: (s) => (s.invoices = {}),
  },
  actions: {
    async getInvoices({ commit, dispatch }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'invoices/',
        })
        if (response.success) {
          commit('SET_INVOICE_LIST', response.invoices)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getInvoicesRequest({ commit, dispatch }, number) {
      try {
        const response = await dispatch('fetchGet', {
          url: `invoices/request/&number=${number}`,
        })
        if (response.success) {
          commit('SET_INVOICE', response.invoice)
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
