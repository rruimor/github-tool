import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import store from './store'

Vue.use(VueRouter)

import Home from './components/home/Home.vue'
import Counter from './components/counter/Counter.vue'
import Signin from './components/auth/Signin.vue'
import NotFound from './components/NotFound.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/counter', component: Counter },
    { path: '/signin', component: Signin },
    { path: '/404', component: NotFound },
    { path: '*', redirect: '/404' },
  ]
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
