export default {
  state: {
    customerList: [],
  },
  getters: {
    CUSTOMER_LIST: (s) => s.customerList,
  },
  mutations: {
    SET_CUSTOMER_LIST: (s, l) => (s.customerList = l),
  },
  actions: {
    async getCustomerList({ commit, dispatch, getters }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'directory/client/customer',
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_CUSTOMER_LIST', response.customers)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
  },
}
