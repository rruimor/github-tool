import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store/index.js'

import Home from './components/home/Home.vue'
import OrganizationView from './components/organization/OrganizationView.vue'
import Counter from './components/counter/Counter.vue'
import Signin from './components/auth/Signin.vue'
import NotFound from './components/NotFound.vue'

Vue.use(VueRouter)

const Router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { 
      path: '/organizations/:organizationSlug',
      component: OrganizationView,
      props: true,
      // beforeEnter: (to, from, next) => {
      //   if (store.state.user.token) {
      //     next()
      //   }
      //   else {
      //     next('/signin')
      //   }
      // }
    },
    { path: '/counter', component: Counter },
    { path: '/signin', component: Signin },
    { path: '/404', component: NotFound },
    { path: '*', redirect: '/404' },
  ] 
})

export default Router