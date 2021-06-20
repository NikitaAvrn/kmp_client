export default {
  state: {
    users: [],
  },
  getters: {
    USER_LIST: (s) => s.users,
  },
  mutations: {
    SET_USER_LIST: (s, u) => (s.users = u),
    CLR_USER_LIST: (s) => (s.users = []),
  },
  actions: {
    async getUsers({ commit, dispatch }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'users/',
        })
        if (response.success) {
          commit('SET_USER_LIST', response.users)
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
