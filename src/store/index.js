import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'osGames',
  storage: window.localStorage
})

const store = new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: { },
  mutations: { },
  actions: { }
})
export default store
