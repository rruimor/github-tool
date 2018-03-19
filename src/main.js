import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import filters from './filters.js'
import App from './components/App.vue'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
