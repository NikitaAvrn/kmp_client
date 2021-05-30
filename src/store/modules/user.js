export default {
  state: {
    userData: null,
    isUserLogin: false,
  },
  getters: {
    USER_DATA: (s) => s.userData,
    IS_USER_LOGIN: (s) => s.isUserLogin,
  },
  mutations: {
    SET_USER_DATA: (s, d) => (s.userData = d),
    CLR_USER_DATA: (s) => (s.userData = null),
    SET_IS_USER_LOGIN: (s, l) => (s.isUserLogin = l),
    CLR_IS_USER_LOGIN: (s) => (s.isUserLogin = true),
  },
  actions: {
    async getUserData({ commit, dispatch, getters }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'user/user-data',
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_USER_DATA', response.user)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },

    async getIsLoginUser({ commit, dispatch, getters }) {
      try {
        if (!getters.USER_AUTH) {
          return false
        }
        const response = await dispatch('fetchGet', {
          url: 'user/user-login',
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
  },
}
