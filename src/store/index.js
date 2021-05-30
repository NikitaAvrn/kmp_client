import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import unitDirectory from './modules/unit.directory'
import userDirectory from './modules/user.directory'
import nomenclatureDirectory from './modules/nomenclature.directory'
import portDirectory from './modules/port.directory'
import cargoDirectory from './modules/cargo.directory'
import packagingDirectory from './modules/packaging.directory'
import containerDirectory from './modules/container.directory'
import request from './modules/request'
import requestCargo from './modules/request.cargo'
import loadingContainer from './modules/loading.container'
import organizationDirectory from './modules/organization.directory'
import customerDirectory from './modules/customer.directory'
import requestFiles from './modules/request.files'
import config from './config.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    msg: null,
  },
  mutations: {
    SET_ERROR: (s, e) => (s.error = e),
    CLR_ERROR: (s) => (s.error = null),
    SET_MSG: (s, m) => (s.msg = m),
    CLR_MSG: (s) => (s.msg = null),
  },
  getters: {
    ERROR: (s) => s.error,
    MSG: (s) => s.msg,
  },
  actions: {
    async fetchPost({ commit }, { url, headers, rBody }) {
      try {
        return await fetch(`${config.server}/api/` + url, {
          method: 'POST',
          mode: 'cors',
          headers: {
            ...headers,
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(rBody),
        }).then((r) => {
          return r.json()
        })
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async fetchPut({ commit }, { url, headers, rBody }) {
      try {
        return await fetch(`${config.server}/api/` + url, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            ...headers,
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(rBody),
        }).then((r) => {
          return r.json()
        })
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async fetchUpdate({ commit }, { url, headers, rBody }) {
      try {
        return await fetch(`${config.server}/api/` + url, {
          method: 'UPDATE',
          mode: 'cors',
          headers: {
            ...headers,
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(rBody),
        }).then((r) => {
          return r.json()
        })
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async fetchGet({ commit }, { url, headers }) {
      try {
        return await fetch(`${config.server}/api/` + url, {
          method: 'GET',
          mode: 'cors',
          headers: {
            ...headers,
            'Content-Type': 'application/json; charset=utf-8',
          },
        }).then((r) => {
          return r.json()
        })
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async fetchDelete({ commit }, { url, headers }) {
      try {
        return await fetch(`${config.server}/api/` + url, {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            ...headers,
            'Content-Type': 'application/json; charset=utf-8',
          },
        }).then((r) => {
          return r.json()
        })
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
  },
  modules: {
    auth,
    user,
    userDirectory,
    unitDirectory,
    nomenclatureDirectory,
    portDirectory,
    cargoDirectory,
    packagingDirectory,
    request,
    requestCargo,
    loadingContainer,
    containerDirectory,
    organizationDirectory,
    customerDirectory,
    requestFiles
  },
})
