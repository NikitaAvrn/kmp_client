export default {
  state: {
    unitList: [],
  },
  getters: {
    UNIT_LIST: (s) => s.unitList,
  },
  mutations: {
    SET_UNIT_LIST: (s, l) => {
      s.unitList = l
    },
    CNG_UNIT_LIST: (s, u) => {
      const index = s.unitList.findIndex(unit => unit._id == u._id)
      s.unitList.splice(index, 1, u)
    }
  },
  actions: {
    async getUnitList({ commit, dispatch, getters }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'directory/unit',
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_UNIT_LIST', response.unit)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getActiveUnitList({ commit, dispatch, getters }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'directory/unit/active',
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_UNIT_LIST', response.unit)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async putUnitActivityById({ commit, dispatch, getters }, { unitId, dataObject}) {
      try {
        const response = await dispatch('fetchPut', {
          url: `directory/unit/${unitId}/activity`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        
        if (response.success) {
          commit('CNG_UNIT_LIST', response.unit)
        }
        commit('SET_MSG', response.message)
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
  },
}
