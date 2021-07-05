export default {
  state: {
    myclients: [],
    clients: [],
    client: {},
  },
  getters: {
    MY_CLIENT_LIST: (s) => s.myclients,
    CLIENT_LIST: (s) => s.clients,
    CLIENT: (s) => s.client,
  },
  mutations: {
    SET_MY_CLIENT_LIST: (s, c) => (s.myclients = c),
    CLR_MY_CLIENT_LIST: (s) => (s.myclients = []),
    SET_CLIENT_LIST: (s, c) => (s.clients = c),
    CLR_CLIENT_LIST: (s) => (s.clients = []),
    SET_CLIENT: (s, c) => (s.client = c),
    CLR_CLIENT: (s) => (s.client = {}),
  },
  actions: {
    async getMyClients({ commit, dispatch }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'directory/clients',
        })
        if (response.success) {
          commit('SET_MY_CLIENT_LIST', response.clients)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getFindClients({ commit, dispatch }, clientQuery) {
      try {
        const response = await dispatch('fetchGet', {
          url: `directory/clients/find&query=${clientQuery}`,
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
    async getClientById({ commit, dispatch }, clientId) {
      try {
        const response = await dispatch('fetchGet', {
          url: `directory/client/by/id/&id=${clientId}`,
        })
        if (response.success) {
          commit('SET_CLIENT', response.client)
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
