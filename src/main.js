import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import AsyncComputed from 'vue-async-computed'
import App from './components/App.vue'


Vue.use(AsyncComputed)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
