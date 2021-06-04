import Vue from 'vue'
import Vuex from 'vuex'
import request from './modules/request'
import invoice from './modules/invoice'
import manifest from './modules/manifest'
import auth from './modules/auth'
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
        return await fetch(`${config.server}` + url, {
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
        return await fetch(`${config.server}` + url, {
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
        return await fetch(`${config.server}` + url, {
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
        return await fetch(`${config.server}` + url, {
          method: 'GET',
          mode: 'cors',
          headers: {
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
        return await fetch(`${config.server}` + url, {
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
    request,
    invoice,
    manifest,
    auth
  },
})
