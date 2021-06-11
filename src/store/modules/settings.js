export default {
  state: {
    sessions: [],
  },
  getters: {
    SESSION_LIST: (s) => s.sessions,
  },
  mutations: {
    SET_SESSION_LIST: (s, l) => (s.sessions = l),
    CLR_SESSION_LIST: (s) => (s.sessions = []),
    DEL_SESSION: (s, req) => {
      let index = s.sessions.findIndex((sessions) => req._id === sessions._id)
      s.sessions.splice(index, 1)
    },
  },
  actions: {
    async getSessions({ commit, dispatch }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'settings/user/sessions/',
        })
        if (response.success) {
          commit('SET_SESSION_LIST', response.sessions)
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
