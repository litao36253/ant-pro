import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    common: {
      state: {
        gloableLoading: false
      },
      mutations: {
        changeGloableLoading (state, payload) {
          state.gloableLoading = payload
        }
      }
    }
  }
})
