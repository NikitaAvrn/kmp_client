export default {
  state: {
    containerLoadList: [],
    readyLoadList: [],
    loadingNowList: [],
  },
  getters: {
    READY_LOAD_LIST: (s) => s.readyLoadList,
    LOADING_NOW_LIST: s => s.loadingNowList,
    CONTAINER_LOAD_LIST: s => s.containerLoadList,
  },
  mutations: {
    SET_READY_LOAD_LIST: (s, l) => s.readyLoadList = l,
    SET_LOADING_NOW_LIST: (s, l) => s.loadingNowList = l,
    SET_CONTAINER_LOAD_LIST: (s, l) => s.containerLoadList = l,
    ADD_LOADING_NOW: (s, e) => s.loadingNowList.push(e),
    ADD_READY_LOAD: (s, e) => s.readyLoadList.push(e),
    ADD_CONTAINER_LOAD: (s, e) => s.containerLoadList.push(e),
    DEL_LOADING_NOW: (s, e) => {
      let index = s.loadingNowList.findIndex(cargo => cargo._id === e._id)
      s.loadingNowList.splice(index, 1)
    },
    DEL_READY_LOAD: (s, e) => {
      let index = s.readyLoadList.findIndex(cargo => cargo._id === e._id)
      s.readyLoadList.splice(index, 1)
    },
    DEL_CONTAINER_LOAD: (s, e) => {
      let index = s.containerLoadList.findIndex(container => container._id === e._id)
      s.containerLoadList.splice(index, 1)
    },
    CLR_LOADING_NOW: s => s.loadingNowList = [],
    CLR_READY_LOAD: s => s.readyLoadList = [],
    CLR_CONTAINER_LOAD: s => s.containerLoadList = []
  },
  actions: {
    async getReadyToLoadList({ commit, dispatch, getters }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'loading-container/ready-load',
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_READY_LOAD_LIST', response.readyLoad)
        }
        return response
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getCargoInsideList({ commit, dispatch, getters }, id) {
      try {
        const response = await dispatch('fetchGet', {
          url: `loading-container/cargoInside/${id}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_LOADING_NOW_LIST', response.loadInside)
        }
        return response
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getLoadContainerById({ commit, dispatch, getters }, id) {
      try {
        const response = await dispatch('fetchGet', {
          url: `loading-container/${id}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          //commit('SET_LOADING_NOW_LIST', response.loadContainer)
        }
        return response
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getLoadContainer({ commit, dispatch, getters }) {
      try {
        const response = await dispatch('fetchGet', {
          url: `loading-container/`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_CONTAINER_LOAD_LIST', response.loadContainer)
        }
        return response
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async postLoadContainer({ commit, dispatch, getters }, dataObject) {
      try {
        const response = await dispatch('fetchPost', {
          url: `loading-container/`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        if (response.success) {
          commit('SET_MSG', response.message)
          commit('ADD_CONTAINER_LOAD', response.container)
          return response.container
        } else {
          return false
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async putLoadContainer({ commit, dispatch, getters }, {loadContainerId, dataObject}) {
      try {
        const response = await dispatch('fetchPut', {
          url: `loading-container/${loadContainerId}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        if (response.success) {
          commit('SET_MSG', response.message)
          return response.container
        } else {
          return false
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
  },
}