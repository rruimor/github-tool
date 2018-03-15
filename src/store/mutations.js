import * as types from './mutation-types'

export const mutations = {
  [types.GET_USER] (state, count_payload) {
    state.user = count_payload
  },
  [types.GET_COUNT] (state, count_payload) {
    state.counts = count_payload
  },
  [types.GET_ORGS] (state, orgs_payload) {
    state.organizations.items = orgs_payload
  },
  [types.GET_ORG] (state, org_payload) {
    state.organizations.current = org_payload
  },
  [types.GET_ORG_MEMBERS] (state, org_payload) {
    state.organizations.current.members = org_payload
  },
  [types.GET_ORG_REPOS] (state, org_payload) {
    state.organizations.current.repos = org_payload
  },
  [types.SET_LOADING_ORGS] (state) {
    state.organizations.loading = true
  },
  [types.UNSET_LOADING_ORGS] (state) {
    state.organizations.loading = false
  },
  [types.INC_COUNT] (state, count_payload) {
    state.counts.count = count_payload
  },
  [types.SIGN_OUT] (state) {
    state.user = {}
  }
}
