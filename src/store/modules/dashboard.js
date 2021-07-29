export default {
  state: {
    conosaments: []
  },
  getters: {
    ACTIVE_CONOSAMENT: (s) => s.conosaments,
  },
  mutations: {
    SET_ACTIVE_CONOSAMENT: (s, c) => (s.conosaments = c),
    CLR_ACTIVE_CONOSAMENT: (s) => (s.conosaments = []),
  },
  actions: {
    async getActiveConosament({ commit, dispatch }) {
      try {
        const response = await dispatch('fetchGet', {
          url: `dashboard/active/conosament`,
        })
        if (response.success) {
          commit('SET_ACTIVE_CONOSAMENT', response.conosaments)
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
