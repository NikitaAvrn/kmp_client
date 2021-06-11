import Vue from 'vue'
import Vuex from 'vuex'
import request from './modules/request'
import invoice from './modules/invoice'
import manifest from './modules/manifest'
import auth from './modules/auth'
import settings from './modules/settings'
import config from './config.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    msg: null,
    status: 0,
  },
  mutations: {
    SET_ERROR: (s, e) => (s.error = e),
    CLR_ERROR: (s) => (s.error = null),
    SET_MSG: (s, m) => (s.msg = m),
    CLR_MSG: (s) => (s.msg = null),
    SET_STATUS: (s, st) => (s.status = st),
    CLR_STATUS: (s) => (s.status = 0),
  },
  getters: {
    ERROR: (s) => s.error,
    MSG: (s) => s.msg,
    STATUS: (s) => s.status,
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
          commit('SET_STATUS', r.status)
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
          commit('SET_STATUS', r.status)
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
          commit('SET_STATUS', r.status)
          return r.json()
        })
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async fetchGet({ commit, getters }, { url }) {
      try {
        return await fetch(`${config.server}` + url, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json; charset=utf-8; CISID=' + getters.SID,
            //'Set-Cookie': `CISID=${getters.SID}`,
            //Authorization: `Basic ${window.btoa(getters.SID)}`,
          },
        }).then((r) => {
          commit('SET_STATUS', r.status)
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
          commit('SET_STATUS', r.status)
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
    auth,
    settings,
  },
})
