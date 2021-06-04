export default {
  state: {
    user: {}, // JSON.parse(localStorage.getItem('userAuth')),
    sid: ''
  },
  getters: {
    //USER_AUTH: (s) => s.userAuth,
    USER: s => s.user,
    SID: s => s.sid
  },
  mutations: {
    SET_USER: (s, u) => s.user = u,
    CLR_USER: (s) => s.user = {},
    SET_SID: (s, sid) => s.sid = sid,
    CLR_SID: (s) => s.sid = '',
    SET_USER_AUTH: (s, d) => {
      const auth = {
        token: d.token,
        userID: d.userID,
      }
      s.userAuth = auth
      localStorage.setItem('userAuth', JSON.stringify(auth))
    },
    CLR_USER_AUTH: (s) => {
      s.userAuth = null
      localStorage.removeItem('userAuth')
    },
  },
  actions: {
    async login({ commit, dispatch }, formData) {
      try {
        const response = await dispatch('fetchPost', { url: 'login/', rBody: formData })
        if (response.success) {
          commit('SET_USER', response.user)
          commit('SET_SID', response.SID)
        } else {
          commit('SET_MSG', response.message)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
  },
}
