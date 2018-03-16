const express = require('express'),
      User = require('../../models/user')
      verifyToken = require('../../helpers/verifyToken');;

module.exports = (() => {
    'use strict';

    const router = express.Router();
    var github = require('@octokit/rest')();

    router.get('/orgs', verifyToken, initGithubClient, (req, res) => {
      console.log("GITHUB INSTANCE:", github)
      console.log("**********TOKEN: ", res.locals.oauthToken)

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

    router.get('/repos/:ownerSlug/:repoSlug/commits', verifyToken, initGithubClient, (req, res) => {
      let ownerSlug = req.params.ownerSlug
      let repoSlug = req.params.repoSlug
      let page = req.query.page || 1
      let author = req.query.author

      let params = {
        owner: ownerSlug,
        repo: repoSlug
      }

      if (author !== undefined) params.author = author

      github
        .repos
        .getCommits(params)
        .then(data => { res.send(data) })
        .catch(e => { res.send(e) })
    })

    function initGithubClient(req, res, next) {
      github.authenticate({
        type: 'token',
        token: res.locals.oauthToken
      })
      return next()
    }

    return router;
})();
