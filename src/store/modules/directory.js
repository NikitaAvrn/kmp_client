export default {
  state: {
    myclients: [],
    clients: [],
    client: {},
    ports: [],
    port: {},
    cargoes: [],
    cargo: {},
    containers: [],
    container: {},
    packagings: [],
    packaging: {},
  },
  getters: {
    MY_CLIENT_LIST: (s) => s.myclients,
    CLIENT_LIST: (s) => s.clients,
    CLIENT: (s) => s.client,
    PORT_LIST: (s) => s.ports,
    PORT: (s) => s.port,
    CARGO_LIST: (s) => s.cargoes,
    CARGO: (s) => s.cargo,
    CONTAINER_LIST: (s) => s.containers,
    CONTAINER: (s) => s.container,
    PACKAGING_LIST: (s) => s.packagings,
    PACKAGING: (s) => s.packaging,
  },
  mutations: {
    SET_MY_CLIENT_LIST: (s, c) => (s.myclients = c),
    CLR_MY_CLIENT_LIST: (s) => (s.myclients = []),
    SET_CLIENT_LIST: (s, c) => (s.clients = c),
    CLR_CLIENT_LIST: (s) => (s.clients = []),
    SET_CLIENT: (s, c) => (s.client = c),
    CLR_CLIENT: (s) => (s.client = {}),
    SET_PORT_LIST: (s, p) => (s.ports = p),
    CLR_PORT_LIST: (s) => (s.ports = []),
    SET_PORT: (s, p) => (s.port = p),
    CLR_PORT: (s) => (s.port = {}),
    SET_CARGO_LIST: (s, c) => (s.cargoes = c),
    CLR_CARGO_LIST: (s) => (s.cargoes = []),
    SET_CARGO: (s, c) => (s.cargo = c),
    CLR_CARGO: (s) => (s.cargo = {}),
    SET_CONTAINER_LIST: (s, c) => (s.containers = c),
    CLR_CONTAINER_LIST: (s) => (s.containers = []),
    SET_CONTAINER: (s, c) => (s.container = c),
    CLR_CONTAINER: (s) => (s.container = {}),
    SET_PACKAGING_LIST: (s, p) => (s.packagings = p),
    CLR_PACKAGING_LIST: (s) => (s.packagings = []),
    SET_PACKAGING: (s, p) => (s.packaging = p),
    CLR_PACKAGING: (s) => (s.packaging = {}),
  },
  actions: {
    async getMyClients({ commit, dispatch }) {
      try {
        const response = await dispatch('fetchGet', {
          url: 'directory/clients',
        })
        if (response.success) {
          commit('SET_MY_CLIENT_LIST', response.clients)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getFindClients({ commit, dispatch }, clientQuery) {
      try {
        const response = await dispatch('fetchGet', {
          url: `directory/clients/find&query=${clientQuery}`,
        })
        if (response.success) {
          commit('SET_CLIENT_LIST', response.clients)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getClientById({ commit, dispatch }, clientId) {
      try {
        const response = await dispatch('fetchGet', {
          url: `directory/client/by/id/&id=${clientId}`,
        })
        if (response.success) {
          commit('SET_CLIENT', response.client)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getFindPorts({ commit, dispatch }, portQuery) {
      try {
        const response = await dispatch('fetchGet', {
          url: `directory/ports/find&query=${portQuery}`,
        })
        if (response.success) {
          commit('SET_PORT_LIST', response.ports)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getPortById({ commit, dispatch }, portId) {
      try {
        const response = await dispatch('fetchGet', {
          url: `directory/port/by/id/&id=${portId}`,
        })
        if (response.success) {
          commit('SET_PORT', response.port)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getFindCargoes({ commit, dispatch }, cargoQuery) {
      try {
        const response = await dispatch('fetchGet', {
          url: `directory/cargoes/find&query=${cargoQuery}`,
        })
        if (response.success) {
          commit('SET_CARGO_LIST', response.cargoes)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getCargoById({ commit, dispatch }, cargoId) {
      try {
        const response = await dispatch('fetchGet', {
          url: `directory/cargo/by/id/&id=${cargoId}`,
        })
        if (response.success) {
          commit('SET_CARGO', response.cargo)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getFindContainers({ commit, dispatch }, containerQuery) {
      try {
        const response = await dispatch('fetchGet', {
          url: `directory/containers/find&query=${containerQuery}`,
        })
        if (response.success) {
          commit('SET_CONTAINER_LIST', response.containers)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getContainerById({ commit, dispatch }, containerId) {
      try {
        const response = await dispatch('fetchGet', {
          url: `directory/container/by/id/&id=${containerId}`,
        })
        if (response.success) {
          commit('SET_CONTAINER', response.container)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getFindPackagings({ commit, dispatch }, packagingQuery) {
      try {
        const response = await dispatch('fetchGet', {
          url: `directory/packaging/find&query=${packagingQuery}`,
        })
        if (response.success) {
          commit('SET_PACKAGING_LIST', response.packaging)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async getPackagingById({ commit, dispatch }, packagingId) {
      try {
        const response = await dispatch('fetchGet', {
          url: `directory/packaging/by/id/&id=${packagingId}`,
        })
        if (response.success) {
          commit('SET_PACKAGING', response.packaging)
        }
        if (response.message) {
          commit('SET_MSG', response.message)
        }
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
  },
}
