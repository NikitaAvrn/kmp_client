export default {
  state: {
    requestCargoList: [],
    cargoProccessing: null
  },
  getters: {
    REQUEST_CARGO_LIST: (s) => s.requestCargoList,
    CARGO_PROCCESSING: (s) => s.cargoProccessing
  },
  mutations: {
    SET_REQUEST_CARGO_LIST: (s, l) => s.requestCargoList = l,
    ADD_REQUEST_CARGO_LIST: (s, c) => s.requestCargoList.push(c),
    CNG_REQUEST_CARGO_LIST: (s, c) => {
      let index = s.requestCargoList.findIndex(cargo => cargo._id === c._id)
      s.requestCargoList.splice(index, 1, c)
    },
    DEL_REQUEST_CARGO: (s, c) => {
      let index = s.requestCargoList.findIndex(cargo => cargo._id === c._id)
      s.requestCargoList.splice(index, 1)
    },
    CLR_REQUEST_CARGO_LIST: (s) => s.requestCargoList = [],
    
    SET_CARGO_PROCCESSING: (s, c) => s.cargoProccessing = c,
    CLR_CARGO_PROCCESSING: s => s.cargoProccessing = {
      packaging: null,
      unit: null,
      date: '',
      cargo: '',
      supplier: null,
      cargoCount: '',
      weightCargo: '',
      volumeCargo: '',
      volume: '',
      count: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      comment: '',
    }
  },
  actions: {
    async getRequestCargoList({ commit, getters, dispatch }, requestId) {
      try {
        const response = await dispatch('fetchGet', {
          url: `request/${requestId}/cargo/`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_REQUEST_CARGO_LIST', response.cargoes)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async postRequestCargo({ commit, dispatch, getters }, { requestId, dataObject }) {
      try {
        const response = await dispatch('fetchPost', {
          url: `request/${requestId}/cargo/`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        if (response.success) {
          commit('SET_MSG', response.message)
          commit('ADD_REQUEST_CARGO_LIST', response.cargo)
          return response.cargo
        } else {
          return false
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async putRequestCargo({ commit, dispatch, getters }, { requestId, cargoId, dataObject }) {
      try {
        const response = await dispatch('fetchPut', {
          url: `request/${requestId}/cargo/${cargoId}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        if (response.success) {
          commit('SET_MSG', response.message)
          commit('CNG_REQUEST_CARGO_LIST', response.cargo)
          return response.cargo
        } else {
          return false
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getRequestCargoById({ commit, dispatch, getters }, cargoId) {
      try {
        const response = await dispatch('fetchGet', {
          url: `request/cargo/${cargoId}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_CARGO_PROCCESSING', response.cargo)
          return response.cargo
        } else {
          return false
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async deleteRequestCargoById({ commit, dispatch, getters }, cargoId) {
      try {
        const response = await dispatch('fetchDelete', {
          url: `request/cargo/${cargoId}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_MSG', response.message)
          commit('DEL_REQUEST_CARGO', response.cargo)
          return response.cargo
        } else {
          return false
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async putRequestCargoArrivalSwitch({ commit, dispatch, getters }, { requestId, cargoId, dataObject }) {
      try {
        const response = await dispatch('fetchPut', {
          url: `request/${requestId}/cargo-arrival/${cargoId}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        if (response.success) {
          commit('SET_MSG', response.message)
          commit('CNG_REQUEST_CARGO_LIST', response.cargo)
          return response.cargo
        } else {
          return false
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    }
  },
}
