import * as types from './mutation-types'
import axios from 'axios'

export const getUser = ({commit}) => {
  return axios.get('/auth')
  .then(function (response) {
    if (response.data.token) {
      const now = new Date()
      const expirationDate = new Date(now.getTime() + response.data.expiresIn * 1000)

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('expiresIn', expirationDate)
      localStorage.setItem('displayName', response.data.displayName)
    }

    commit(types.GET_USER, response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const tryAutoLogin = ({commit}) => {
  const token = localStorage.getItem('token')
  if (!token) return

  const expirationDate = localStorage.getItem('expirationDate')
  const now = new Date()
  if (now >= expirationDate) return

  const displayName = localStorage.getItem('displayName')
  commit(types.GET_USER, { token, displayName })
}

export const getOrgs = ({commit, state}) => {  
  return fetch(`api/github/orgs`, {
    headers: {
      'X-Access-Token': state.user.token
    }
  })
  .then(response => response.json())
  .then(json => commit(types.GET_ORGS, json.data))
  .catch(e => { console.log(e) })
}

export const getOrg = ({commit, state}, orgSlug) => { 
  return axios.get(`/api/github/orgs/${orgSlug}`, {
    headers: {
      'X-Access-Token': state.user.token
    },
  })
  .then(response => {
    let responseData = response.data

    console.log("response code: ", responseData.code)

    if (responseData.code === 404) {
      return
    }
    else {
      commit(types.GET_ORG, responseData.data)
    }

  })
  .catch(e => { console.log(e) })
}

export const getOrgMembers = ( {commit, state}, orgSlug, page = 1 ) => {
  return axios.get(`/api/github/orgs/${orgSlug}/members`, {
    headers: {
      'X-Access-Token': state.user.token
    },
    params: {
      page: page
    }
  })
    .then(response => {
      let responseData = response.data

      console.log("response code: ", responseData.code)

      if (responseData.code === 404) {
        return
      }
      else {
        commit(types.GET_ORG_MEMBERS, responseData.data)
      }

    })
    .catch(e => { console.log(e) })
}

export const getOrgRepos = ( {commit, state}, orgSlug, page = 1 ) => {
  return axios.get(`/api/github/orgs/${orgSlug}/repos`, {
    headers: {
      'X-Access-Token': state.user.token
    },
    params: {
      page: page
    }
  })
    .then(response => {
      let responseData = response.data

      console.log("response code: ", responseData.code)

      if (responseData.code === 404) {
        return
      }
      else {
        commit(types.GET_ORG_REPOS, responseData.data)
      }

    })
    .catch(e => { console.log(e) })
}

export const getRepo = ({ commit, state }, repoParams, page = 1) => {
  return axios.get(`/api/github/repos/${repoParams.ownerSlug}/${repoParams.repoSlug}`, {
    headers: {
      'X-Access-Token': state.user.token
    },
    params: {
      page: page
    }
  })
    .then(response => {
      let responseData = response.data
      if (responseData.code === 404) {
        return
      }
      else {
        commit(types.GET_REPO, responseData.data)
      }

    })
    .catch(e => { console.log(e) })
}

export const getRepoCollaborators = ({ commit, state }, repoParams, page = 1) => {
  return axios.get(`/api/github/repos/${repoParams.ownerSlug}/${repoParams.repoSlug}/collaborators`, {
    headers: {
      'X-Access-Token': state.user.token
    },
    params: {
      page: page
    }
  })
    .then(response => {
      let responseData = response.data
      if (responseData.code === 404) {
        return
      }
      else {
        commit(types.GET_REPO_COLLABORATORS, responseData.data)
      }

    })
    .catch(e => { console.log(e) })
}

export const signOut = ({commit}) => {
  commit(types.SIGN_OUT)
  localStorage.clear()
}
