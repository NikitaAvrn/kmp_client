export default {
  state: {
    portList: [],
  },
  getters: {
    PORT_LIST: (s) => s.portList,
  },
  mutations: {
    SET_PORT_LIST: (s, l) => {
      s.portList = l
    },
  },
  actions: {
    async fetchPortList({ commit, dispatch, getters }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'directory/port',
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_PORT_LIST', response.port)
        }
        return response
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
  },
}
