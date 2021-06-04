export default {
  state: {
    invoices: []
  },
  getters: {
    INVOICE_LIST: (s) => s.invoices,
  },
  mutations: {
    SET_INVOICE_LIST: (s, l) => (s.invoices = l),
    CLR_INVOICE_LIST: (s) => (s.invoices = []),
    DEL_INVOICE: (s, req) => {
      let index = s.invoices.findIndex(invoices => req._id === invoices._id)
      s.invoices.splice(index, 1)
    },
  },
  actions: {
    async getInvoices({ commit, getters, dispatch }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'invoices/',
        })
        if (response.success) {
          commit('SET_INVOICE_LIST', response.invoices)
        }
        if(response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getInvoiceById({ commit, dispatch, getters }, id) {
      try {
        const response = await dispatch('fetchGet', {
          url: `invoice/${id}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_REQUEST_PROCCESSING', response.request)
          return response.request
        } else {
          return false
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
  },
}