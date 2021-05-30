import config from '../config.json'

export default {
  state: {
    fileList: []
  },
  getters: {
    FILE_LIST: (s) => s.fileList,
  },
  mutations: {
    SET_FILE_LIST: (s, l) => s.fileList = l,
    ADD_FILE_LIST: (s, c) => s.fileList.push(c),
    DEL_FILE_LIST: (s, f) => {
      let index = s.fileList.findIndex(file => file._id === f._id)
      s.fileList.splice(index, 1)
    }
  },
  actions: {
    async getRequestFileList({ commit, dispatch, getters }, { request }) {
      try {
        const response = await dispatch('fetchGet', {
          url: `request/${request}/file/`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_FILE_LIST', response.file)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async deleteRequestFileById({ commit, dispatch, getters }, { request, file }) {
      try {
        const response = await dispatch('fetchDelete', {
          url: `request/${request}/delete/${file}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
        })
        if (response.success) {
          commit('SET_MSG', response.message)
          commit('DEL_FILE_LIST', response.file)
          return response.cargo
        } else {
          return false
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async uploadFiles({ commit, dispatch, getters }, {files, request}) {
      const formData = new FormData()
      for(let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
      }
      try {
        const response = await fetch(`${config.server}/api/request/${request}/uploads`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          },
          body: formData
        }).then(r => r.json())
        if (response.success) {
          commit('SET_MSG', response.message)
          commit('ADD_FILE_LIST', response.file)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async downloadFile({ commit, dispatch, getters }, {request, file}) {
      try {
        const response = await dispatch('fetchGet', {
          url: `request/${request}/download/${file}`,
          headers: {
            Authorization: `Bearer ${getters.USER_AUTH.token}`,
          }
        })
        if(response.success) {
          commit('SET_MSG', response.message)
        }
        return response.success
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
  },
}