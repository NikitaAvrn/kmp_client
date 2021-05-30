export default {
  state: {
    containerList: [],
    editContainer: null
  },
  getters: {
    CONTAINER_LIST: s => s.containerList,
    EDIT_CONTAINER: s => s.editContainer
  },
  mutations: {
    SET_CONTAINER_LIST: (s, l) => s.containerList = l,
    ADD_CONTAINER_LIST: (s, c) => s.containerList.push(c),
    CNG_CONTAINER_LIST: (s, c) => {
      const index = s.containerList.findIndex(container => container._id == c._id)
      s.containerList.splice(index, 1, c)
    },
    CLR_EDIT_CONTAINER: s => s.editContainer = {
      number: '',
      type: '',
      size: '',
      iso: '',
      owner: null,
      weight: '',
      active: true,
    },
    SET_EDIT_CONTAINER: (s, c) => s.editContainer = c
  },
  actions: {
    async getContainerList({ commit, dispatch, getters }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'directory/container',
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_CONTAINER_LIST', response.container)
        }
        return response
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getContainerById({ commit, dispatch, getters }, id) {
      try {
        const response = await dispatch('fetchGet', {
          url: `directory/container/${id}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_EDIT_CONTAINER', response.container)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async postContainer({ commit, dispatch, getters }, dataObject) {
      try {
        const response = await dispatch('fetchPost', {
          url: `directory/container/`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        
        if (response.success) {
          commit('ADD_CONTAINER_LIST', response.container)
        }
        commit('SET_MSG', response.message)
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async putContainerById({ commit, dispatch, getters }, { containerId, dataObject}) {
      try {
        const response = await dispatch('fetchPut', {
          url: `directory/container/${containerId}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        
        if (response.success) {
          commit('CNG_CONTAINER_LIST', response.container)
        }
        commit('SET_MSG', response.message)
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async putContainerActivityById({ commit, dispatch, getters }, { containerId, dataObject}) {
      try {
        const response = await dispatch('fetchPut', {
          url: `directory/container/${containerId}/activity`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        
        if (response.success) {
          commit('CNG_CONTAINER_LIST', response.container)
        }
        commit('SET_MSG', response.message)
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
  }
}
