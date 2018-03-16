const express = require('express'),
      verifyToken = require('../../helpers/verifyToken');

module.exports = (() => {
    'use strict';

    const router = express.Router();
    var github = require('@octokit/rest')();

    router.get('/orgs', verifyToken, initGithubClient, (req, res) => {
      // console.log("GITHUB INSTANCE:", github)
      // console.log("**********TOKEN: ", res.locals.oauthToken)
      github.users
        .getOrgs({
          headers: {
              accept: 'application/vnd.github.mercy-preview+json'
          }
        })
        .then(data => { res.send(data) });
    })

    router.get('/orgs/:orgSlug', verifyToken, initGithubClient, (req, res) => {
      let orgSlug = req.params.orgSlug

      github.orgs
        .get({ org: orgSlug })
        .then(data => { res.send(data) })
        .catch(e => { res.send(e) })
    })

    router.get('/orgs/:orgSlug/members', verifyToken, initGithubClient, (req, res) => {
      let orgSlug = req.params.orgSlug
      let page = req.query.page || 1

      github.orgs
        .getMembers({
          org: orgSlug,
          page: page
        })
        .then(data => { res.send(data) })
        .catch(e => { res.send(e) })
    })

    router.get('/orgs/:orgSlug/repos', verifyToken, initGithubClient, (req, res) => {let orgSlug = req.params.orgSlug
      let page = req.query.page || 1

      github.repos
        .getForOrg({
          org: orgSlug,
          page: page
        })
        .then(data => { res.send(data) })
        .catch(e => { res.send(e) })
    })

    router.get('/repos/:ownerSlug/:repoSlug', verifyToken, initGithubClient, (req, res) => {let ownerSlug = req.params.ownerSlug
      let repoSlug = req.params.repoSlug
      let page = req.query.page || 1

      github.repos
        .get({
          owner: ownerSlug,
          repo: repoSlug,
          page: page
        })
        .then(data => { res.send(data) })
        .catch(e => { res.send(e) })
    })

    router.get('/repos/:ownerSlug/:repoSlug/collaborators', verifyToken, initGithubClient, (req, res) => {let ownerSlug = req.params.ownerSlug
      let repoSlug = req.params.repoSlug
      let page = req.query.page || 1

      github.repos
        .getCollaborators({
          owner: ownerSlug,
          repo: repoSlug,
          page: page
        })
        .then(data => { res.send(data) })
        .catch(e => { res.send(e) })
    })

    router.get('/repos/:ownerSlug/:repoSlug/lastcommit', verifyToken, initGithubClient, (req, res) => {
      let ownerSlug = req.params.ownerSlug
      let repoSlug = req.params.repoSlug
      let page = req.query.page || 1
      let author = req.query.author

      let params = {
        owner: ownerSlug,
        repo: repoSlug
      }

      if (author !== undefined) params.author = author

      getLastCommit(github, params, (error, commit) => {
        res.send(commit)
      })
    })

    function initGithubClient(req, res, next) {
      github.authenticate({
        type: 'token',
        token: res.locals.oauthToken
      })
      return next()
    }

    function getLastCommit(githubClient, params, method) {
      _withAllBranches(githubClient, params, (error, repoBranches) => {
        if (error) return method(error)

        Promise.all(repoBranches.map(branch => {
          params.sha = branch.name

          // console.log('branch name: ', branch.name)
          // console.log('params: ', params)

          return githubClient.repos.getCommits(params).then(response => {
            let commit = response.data[0]
            commit.branch = branch
            // console.log("commit: \n", commit)
            return commit
          })
        }))
          .then(combined => {
            const max = combined.reduce((prev, current) => {
              return (prev.commit.author.date > current.commit.author.date) ? prev : current
            }) 
            method(null, max)
          })
          .catch(error => method(error))
      })      
    }

    function _withAllBranches(githubClient, params, method) {
      githubClient
        .repos
        .getBranches(params)
        .then(res => method(null, res.data))
        .catch(e => {
          console.log(e)
          method(e) 
        })
    }

    return router;
})();
