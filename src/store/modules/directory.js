export default {
  state: {
    clients: [],
  },
  getters: {
    CLIENT_LIST: (s) => s.clients,
  },
  mutations: {
    SET_CLIENT_LIST: (s, u) => (s.clients = u),
    CLR_CLIENT_LIST: (s) => (s.clients = []),
  },
  actions: {
    async getMyClients({ commit, dispatch }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'directory/clients',
        })
        if (response.success) {
          commit('SET_CLIENT_LIST', response.clients)
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
