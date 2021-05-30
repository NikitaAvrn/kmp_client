export default {
  state: {
    requestList: [],
    requestProccessing: null
  },
  getters: {
    REQUEST_LIST: (s) => s.requestList,
    REQUEST_PROCCESSING: (s) => s.requestProccessing
  },
  mutations: {
    SET_REQUEST_LIST: (s, l) => (s.requestList = l),
    CLR_REQUEST_LIST: (s) => (s.requestList = []),
    DEL_REQUEST: (s, req) => {
      let index = s.requestList.findIndex(request => req._id === request._id)
      s.requestList.splice(index, 1)
    },
    SET_REQUEST_PROCCESSING: (s, rp) => 
    {
      s.requestProccessing = rp
      s.requestProccessing.number = s.requestProccessing.customer.prefix + '-' + s.requestProccessing.number
    }
  },
  actions: {
    async getRequestList({ commit, getters, dispatch }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'request/',
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_REQUEST_LIST', response.requests)
        }
        return response.request
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

    async updateRequestById({ commit, dispatch, getters }, {requestId, dataObject}) {
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

    async getRequestById({ commit, dispatch, getters }, id) {
      try {
        const response = await dispatch('fetchGet', {
          url: `request/${id}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
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
    async deleteRequestById({ commit, dispatch, getters }, id) {
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
