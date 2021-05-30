export default {
  state: {
    cargoList: [],
  },
  getters: {
    CARGO_LIST: (s) => s.cargoList,
  },
  mutations: {
    SET_CARGO_LIST: (s, l) => s.cargoList = l,
    ADD_CARGO_LIST: (s, c) => s.cargoList.push(c)
  },
  actions: {
    async getCargoList({ commit, dispatch, getters }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'directory/cargo',
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_CARGO_LIST', response.cargo)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
  },
}
