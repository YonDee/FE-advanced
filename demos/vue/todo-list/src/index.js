import Vue from 'vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
import History from './components/History.vue'
import VueRouter from "vue-router";
import Vuex from 'vuex';

Vue.config.productionTip = false
Vue.use(VueRouter)

Vue.use(Vuex)

// 设置 history 全局状态，组件间会共享
const store = new Vuex.Store({
  state: {
    history: []
  },
  getters: {

  },
  mutations: {
    setHistory (state, history) {
      state.history = history
    }
  },
  actions: {
    setHistory ({ commit }, history) {
      commit('setHistory', history)
    }
  }
})


const routes = [
  {path: '/', component: Home},
  {path: '/history', component: History},
]

const router = new VueRouter({
  base: '/',
  routes
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
