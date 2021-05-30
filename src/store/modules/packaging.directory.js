export default {
  state: {
    packagingList: [],
  },
  getters: {
    PACKAGING_LIST: (s) => s.packagingList,
  },
  mutations: {
    SET_PACKAGING_LIST: (s, l) => (s.packagingList = l),
    CNG_UNIT_LIST: (s, p) => {
      const index = s.packagingList.findIndex(packaging => packaging._id == p._id)
      s.packagingList.splice(index, 1, p)
    }
  },
  actions: {
    async getPackagingList({ commit, dispatch, getters }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'directory/packaging',
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_PACKAGING_LIST', response.packaging)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getPackagingActiveList({ commit, dispatch, getters }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'directory/packaging/active',
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_PACKAGING_LIST', response.packaging)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async putPackagingActivityById({ commit, dispatch, getters }, { packagingId, dataObject}) {
      try {
        const response = await dispatch('fetchPut', {
          url: `directory/packaging/${packagingId}/activity`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        
        if (response.success) {
          commit('CNG_PACKAGING_LIST', response.packaging)
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
