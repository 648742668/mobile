import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage:window.sessionStorage
  })],
  state: {
    token: '',
    consumer:{},
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_CONSUMER(state, consumer) {
      state.consumer = consumer
    },
  },
  getters:{
    GET_TOKEN(state) {
      return state.token
    },
    GET_CONSUMER(state) {
      return state.consumer
    },
  },
  actions: {
  },
  modules: {
  }
})
