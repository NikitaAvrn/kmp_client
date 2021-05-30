export default {
  state: {
    clientList: [],
    editClient: null
  },
  getters: {
    CLIENT_LIST: s => s.clientList,
    EDIT_CLIENT: s => s.editClient
  },
  mutations: {
    SET_CLIENT_LIST: (s, l) => s.clientList = l,
    SET_EDIT_CLIENT: (s, c) => s.editClient = c,
    CLR_EDIT_CLIENT: s => s.editClient = {
        full: '',
        full_with_opf: '',
        short: '',
        short_with_opf: '',
        inn: '',
        kpp: '',
        ogrn: '',
        ogrn_date: '',
        okato: '',
        okfs: '',
        okogu: '',
        okpo: '',
        oktmo: '',
        okved: '',
        address: '',
        zip_code: '',
        geo_lat: '',
        geo_lon: '',
        name: '',
        post: '',
        isCustomer: false
      
    },
    ADD_CLIENT_LIST: (s, c) => s.clientList.push(c),
    CNG_CLIENT_LIST: (s, c) => {
      const index = s.clientList.findIndex(client => client._id == c._id)
      s.clientList.splice(index, 1, c)
    }
  },
  actions: {
    async getClientList({ commit, dispatch, getters }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'directory/client/',
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_CLIENT_LIST', response.clients)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getClientById({ commit, dispatch, getters }, id) {
      try {
        const response = await dispatch('fetchGet', {
          url: `directory/client/${id}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_EDIT_CLIENT', response.client)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async postClient({ commit, dispatch, getters }, dataObject) {
      try {
        const response = await dispatch('fetchPost', {
          url: `directory/client/`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        
        if (response.success) {
          commit('ADD_CLIENT_LIST', response.client)
        }
        commit('SET_MSG', response.message)
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async putClientById({ commit, dispatch, getters }, { clientId, dataObject}) {
      try {
        const response = await dispatch('fetchPut', {
          url: `directory/client/${clientId}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        
        if (response.success) {
          commit('CNG_CLIENT_LIST', response.client)
        }
        commit('SET_MSG', response.message)
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async putClientCustomerById({ commit, dispatch, getters }, { clientId, dataObject}) {
      try {
        const response = await dispatch('fetchPut', {
          url: `directory/client/customer/${clientId}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        
        if (response.success) {
          commit('CNG_CLIENT_LIST', response.client)
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