export default {
  state: {
    nomenclatureList: [],
  },
  getters: {
    NOMENCLATURE_LIST: (s) => s.nomenclatureList,
  },
  mutations: {
    SET_NOMENCLATURE_LIST: (s, l) => (s.nomenclatureList = l),
    ADD_NOMENCLATURE_LIST: (s, d) => s.nomenclatureList.push(d),
  },
  actions: {
    async fetchNomenclatureList({ commit, dispatch, getters }) {
      try {
        const response = await dispatch("fetchGet", {
          url: "directory/nomenclature",
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit("SET_NOMENCLATURE_LIST", response.nomenclaturies)
        }
        return response
      } catch (e) {
        commit("SET_ERROR", e)
        throw e
      }
    },
    async fetchNomenclatureAdd({ commit, dispatch, getters }, dataObject) {
      try {
        const response = await dispatch("fetchPost", {
          url: "directory/nomenclature/",
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        if (response.success) {
          commit("ADD_NOMENCLATURE_LIST", response.nomenclature)
        }
        return response
      } catch (e) {
        commit("SET_ERROR", e)
        throw e
      }
    },
  },
}
