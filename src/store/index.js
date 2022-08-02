import Vue from 'vue'
import Vuex from 'vuex'
import {setItem, getItem, removeItem} from '@/utils/storage'

Vue.use(Vuex)

// Token Key
const TOKEN_KEY = 'NEWS_USR'

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY) // an Object store user infomation(token...)
  },
  getters: {
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // reserve Token in LocalStorage
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
