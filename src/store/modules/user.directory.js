export default {
  state: {
    userList: [],
    editUser: null
  },
  getters: {
    USER_LIST: (s) => s.userList,
    EDIT_USER: s => s.editUser
  },
  mutations: {
    SET_USER_LIST: (s, l) => s.userList = l,
    ADD_USER_LIST: (s, u) => s.userList.push(u),
    CNG_USER_LIST: (s, u) => {
      const index = s.userList.findIndex(user => user._id == u._id)
      s.userList.splice(index, 1, u)
    },
    SET_EDIT_USER: (s, u) => s.editUser = u,
    CLR_EDIT_USER: s => s.editUser = {
      name: '',
      surname: '',
      patronymic: '',
      phone: '',
      email: '',
      password: '',
      access: ['/'],
      active: false,
    }
  },
  actions: {
    async getUserList({ commit, getters, dispatch }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'directory/user',
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_USER_LIST', response.users)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getUserById({ commit, getters, dispatch }, userID) {
      try {
        const response = await dispatch('fetchGet', {
          url: `directory/user/${userID}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_EDIT_USER', response.user)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async postUser({ commit, getters, dispatch }, dataObject) {
      try {
        const response = await dispatch('fetchPost', {
          url: `directory/user/`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        
        if (response.success) {
          commit('ADD_USER_LIST', response.user)
        }
        commit('SET_MSG', response.message)
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async putUserById({ commit, getters, dispatch }, { userId, dataObject }) {
      try {
        const response = await dispatch('fetchPut', {
          url: `directory/user/${userId}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        
        if (response.success) {
          commit('CNG_USER_LIST', response.user)
        }
        commit('SET_MSG', response.message)
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async putUserActivityById({ commit, getters, dispatch }, { userId, dataObject }) {
      try {
        const response = await dispatch('fetchPut', {
          url: `directory/user/${userId}/activity`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          rBody: dataObject,
        })
        
        if (response.success) {
          commit('CNG_USER_LIST', response.user)
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
