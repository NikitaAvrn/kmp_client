export default {
  state: {
    userAuth: JSON.parse(localStorage.getItem('userAuth')),
  },
  getters: {
    USER_AUTH: (s) => s.userAuth,
  },
  mutations: {
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
        const response = await dispatch('fetchPost', { url: 'auth/login', rBody: formData })
        if (response.success) {
          commit('SET_USER_AUTH', response)
        } else {
          commit('SET_ERROR', response)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
  },
}
