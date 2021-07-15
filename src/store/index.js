import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)


//sadasd
export default new Vuex.Store({
  plugins: [createPersistedState({
    storage:window.sessionStorage
  })],
  state: {
    token: '',
    consumer:{},
    changePwd:'',
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_CONSUMER(state, consumer) {
      state.consumer = consumer
    },
    SET_CHANGEPWD(state, changePwd) {
      state.changePwd = changePwd
    },
  },
  getters:{
    GET_TOKEN(state) {
      return state.token
    },
    GET_CONSUMER(state) {
      return state.consumer
    },
    GET_CHANGEPWD(state) {
      return state.changePwd
    },
  },
  actions: {
  },
  modules: {
  }
})
