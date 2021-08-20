export default {
  state: {
    schedule: null,
  },
  getters: {
    SCHEDULE: (s) => s.schedule,
  },
  mutations: {
    SET_SCHEDULE: (s, t) => (s.schedule = t),
    CLR_SCHEDULE: (s) => (s.schedule = null),
  },
  actions: {
    async getHomeSchedule({ commit, dispatch }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'home/schedule/',
        })
        if (response.success) {
          commit('SET_SCHEDULE', response.schedule)
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
