export default {
  state: {
    user: JSON.parse(localStorage.getItem('user')) || {},
    sid: localStorage.getItem('sid') || '',
    login: true,
  },
  getters: {
    USER: (s) => s.user,
    SID: (s) => s.sid,
    LOGIN: (s) => s.login,
  },
  mutations: {
    SET_USER: (s, u) => {
      s.user = u
      localStorage.setItem('user', JSON.stringify(u))
    },
    CLR_USER: (s) => {
      s.user = {}
      localStorage.removeItem('user')
    },
    SET_SID: (s, sid) => {
      s.sid = sid
      localStorage.setItem('sid', sid)
    },
    CLR_SID: (s) => {
      s.sid = ''
      localStorage.removeItem('sid')
    },
    SET_LOGIN: (s, l) => (s.login = l),
    CLR_LOGIN: (s) => (s.login = false),
  },
  actions: {
    async login({ commit, dispatch }, formData) {
      try {
        const response = await dispatch('fetchPost', { url: 'login/', rBody: formData })
        if (response.success) {
          commit('SET_USER', response.user)
          commit('SET_SID', response.SID)
          commit('SET_LOGIN', response.login)
        } else {
          commit('SET_MSG', response.message)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async checkLogin({ commit, dispatch }) {
      try {
        const response = await dispatch('fetchGet', { url: 'login/check' })
        commit('SET_LOGIN', response.login)
        commit('SET_MSG', response.message)
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
  },
}
