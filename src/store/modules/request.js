export default {
  state: {
    requests: [],
    history: [],
    requestProccessing: null,
  },
  getters: {
    REQUEST_LIST: (s) => s.requests,
    HISTORY_LIST: (s) => s.history,
    REQUEST_PROCCESSING: (s) => s.requestProccessing,
  },
  mutations: {
    SET_REQUEST_LIST: (s, l) => (s.requests = l),
    SET_HISTORY_LIST: (s, l) => (s.history = l),
    CLR_REQUEST_LIST: (s) => (s.requests = []),
    DEL_REQUEST: (s, req) => {
      let index = s.requests.findIndex((request) => req._id === request._id)
      s.requests.splice(index, 1)
    },
    SET_REQUEST_PROCCESSING: (s, rp) => {
      s.requestProccessing = rp
    },
    CLR_REQUEST_PROCCESSING: (s) => {
      s.requestProccessing = null
    },
  },
  actions: {
    async getHistoryRequests({ commit, getters, dispatch }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'requests/history',
        })
        if (response.success) {
          commit('SET_HISTORY_LIST', response.requests)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getRequests({ commit, getters, dispatch }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'requests/',
        })
        if (response.success) {
          commit('SET_REQUEST_LIST', response.requests)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async postRequest({ commit, dispatch, getters }, dataObject) {
      try {
        const response = await dispatch('fetchPost', {
          url: 'request/',
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        if (response.success) {
          commit('SET_MSG', response.message)
          return response.request
        } else {
          return false
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async updateRequestByNumber({ commit, dispatch, getters }, { requestId, dataObject }) {
      try {
        const response = await dispatch('fetchPut', {
          url: `request/${requestId}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        if (response.success) {
          commit('SET_MSG', response.message)
          commit('SET_REQUEST_PROCCESSING', response.request)
          return response.request
        } else {
          return false
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getRequestByNumber({ commit, dispatch }, number) {
      try {
        const response = await dispatch('fetchGet', {
          url: `request&number=${number}`,
        })
        if (response.success) {
          commit('SET_REQUEST_PROCCESSING', response.request)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async deleteRequestByNumber({ commit, dispatch, getters }, id) {
      try {
        const response = await dispatch('fetchDelete', {
          url: `request/${id}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_MSG', response.message)
          commit('DEL_REQUEST', response.request)
          return response.request
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
