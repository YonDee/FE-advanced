import Vue from 'vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
import History from './components/History.vue'
import VueRouter from "vue-router";

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  {path: '/', component: Home},
  {path: '/history', component: History},
]

const router = new VueRouter({
  base: '/',
  routes
})

new Vue({
  // render: h => h(App)
  router,
  render: h => h(App)
}).$mount('#app')
