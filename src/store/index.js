import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
  user: {},
  counts: {
    count: -1
  },
  organizations: {
    items: [],
    loaded: false,
    current: null
  },
  repos: {
    
  }
}

const getters = {
  isUserLogged: state => {
    return state.user.token != undefined
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
