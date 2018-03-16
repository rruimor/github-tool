const express = require('express'),
      User = require('../../models/user')
      verifyToken = require('../../helpers/verifyToken');;

module.exports = (() => {
    'use strict';

    const router = express.Router();
    var github = require('@octokit/rest')();

    router.get('/orgs', verifyToken, getGithubUserToken, initGithubClient, (req, res) => {
      github.users
        .getOrgs({
          headers: {
              accept: 'application/vnd.github.mercy-preview+json'
          }
        })
        .then(data => { res.send(data) });
    })

    router.get('/orgs/:orgSlug', verifyToken, getGithubUserToken, initGithubClient, (req, res) => {
      let orgSlug = req.params.orgSlug

      github.orgs
        .get({ org: orgSlug })
        .then(data => { res.send(data) })
        .catch(e => { res.send(e) })
    })

    router.get('/orgs/:orgSlug/members', verifyToken, getGithubUserToken, initGithubClient, (req, res) => {
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

    router.get('/orgs/:orgSlug/repos', verifyToken, getGithubUserToken, initGithubClient, (req, res) => {let orgSlug = req.params.orgSlug
      let page = req.query.page || 1

      github.repos
        .getForOrg({
          org: orgSlug,
          page: page
        })
        .then(data => { res.send(data) })
        .catch(e => { res.send(e) })
    })

    router.get('/repos/:ownerSlug/:repoSlug', verifyToken, getGithubUserToken, initGithubClient, (req, res) => {let ownerSlug = req.params.ownerSlug
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

    router.get('/repos/:ownerSlug/:repoSlug/collaborators', verifyToken, getGithubUserToken, initGithubClient, (req, res) => {let ownerSlug = req.params.ownerSlug
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

    router.get('/repos/:ownerSlug/:repoSlug/commits', verifyToken, getGithubUserToken, initGithubClient, (req, res) => {
      let ownerSlug = req.params.ownerSlug
      let repoSlug = req.params.repoSlug
      let page = req.query.page || 1
      let author = req.query.author

      let params = {
        owner: ownerSlug,
        repo: repoSlug
      }

      if (author !== undefined) params.author = author

      // console.log(aggregateCommitsFromBranches(params))

      // res.send({})

      github
        .repos
        .getCommits(params)
        .then(data => { res.send(data) })
        .catch(e => { res.send(e) })
    })

    function getGithubUserToken(req, res, next) {
      // Find User ID
      User.findById(res.locals.userId, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        res.locals.oauthToken = user.oauthToken
        return next()
      });
    }

    function initGithubClient(req, res, next) {
      github.authenticate({
        type: 'token',
        token: res.locals.oauthToken
      })
      return next()
    }

    function aggregateCommitsFromBranches(params) {
      let commits = []
      github
        .repos
        .getBranches(params)
        .then(data => {
          // All branches
          let branches = data.data
          console.log("Branches: ", branches)

          return branches})
        .then(branches => {
          for (let branch of branches) {
            params.sha = branch
            params.per_page = 1

            github
              .repos
              .getCommits(param)
              .then(data => {
                console.log("yolo")
                console.log(data);
              })
              .catch(e => e)
          }
        })
        .catch(e => e)
    }

    return router;
})();
