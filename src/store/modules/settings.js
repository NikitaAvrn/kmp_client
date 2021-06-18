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
    DEL_SESSION: (s, session) => {
      let index = s.sessions.findIndex((element) => session.sid === element.sid)
      s.sessions.splice(index, 1)
    },
  },
  actions: {
    async getSessions({ commit, dispatch }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'settings/sessions/',
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
    async deleteSessionBySid({ commit, dispatch }, { sessionId }) {
      try {
        const response = await dispatch('fetchDelete', {
          url: 'settings/session/close',
          rBody: {
            sid: sessionId
          }
        })
        if (response.success) {
          commit('DEL_SESSION', response.session)
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
