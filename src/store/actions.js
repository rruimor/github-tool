import * as types from './mutation-types'
import axios from 'axios'

export const getUser = ({commit}) => {
  axios.get('/isauth')
  .then(function (response) {
    commit(types.GET_USER, response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const getOrgs = ({ commit }, payload) => {
  fetch(`api/github/orgs`, {
    headers: {
      'X-Access-Token': payload.token
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
}

export const getReposForOrg = ({ commit }, payload) => {
  
}

export const getCount = ({commit}, payload) => {
  fetch(`/api/count`, {
    method: 'GET',
    headers: {
      'X-Access-Token': payload.token
    }
  })
  .then(response => response.json())
  .then(json => commit(types.GET_COUNT, json))
}

export const incCount = ({commit}, count_payload) => {
  fetch(`/api/count`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ count: ++count_payload })
  })
  .then(response => response.json())
  .then(json => commit(types.INC_COUNT, json))
}

export const signOut = ({commit}) => {
  commit(types.SIGN_OUT)
}
