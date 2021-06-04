export default {
  state: {
    documents: [],
    ports: [],
    flight: {}
  },
  getters: {
    DOCUMENTS: (s) => s.documents,
    PORTS: (s) => s.ports,
    FLIGHT: (s) => s.flight,
  },
  mutations: {
    SET_DOCUMENTS: (s, d) => (s.documents = d),
    SET_PORTS: (s, p) => (s.ports = p),
    SET_FLIGHT: (s, f) => (s.flight = f),
    CLR_DOCUMENTS: (s) => (s.documents = []),
    CLR_PORTS: (s) => (s.ports = []),
    CLR_FLIGHT: (s) => (s.flight = {}),
  },
  actions: {
    async getManifest({ commit, getters, dispatch }, { ship, flight }) {
      try {
        const response = await dispatch('fetchGet', {
          url: `manifest/&ship=${ship}&flight=${flight}`,
        })
        if (response.success) {
          commit('SET_DOCUMENTS', response.documents)
          commit('SET_PORTS', response.ports)
          commit('SET_FLIGHT', response.flight)
        }
        if(response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
  },
}