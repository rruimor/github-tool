const express = require('express'),
      User = require('../../models/user')
      verifyToken = require('../../helpers/verifyToken');;

module.exports = (() => {
    'use strict';

    const router = express.Router();
    var github = require('@octokit/rest')();

    router.get('/orgs', verifyToken, getGithubUserToken, (req, res) => {
      github.authenticate({
        type: 'token',
        token: res.locals.oauthToken
      })

      github.users
        .getOrgs({
          headers: {
              accept: 'application/vnd.github.mercy-preview+json'
          }
        })
        .then(data => { res.send(data) });
    })

    router.get('/orgs/:orgSlug', verifyToken, getGithubUserToken, (req, res) => {
      let orgSlug = req.params.orgSlug
      console.log("Org Slug: ", orgSlug)

      github.authenticate({
        type: 'token',
        token: res.locals.oauthToken
      })

      github.orgs
        .get({
          org: orgSlug,
          // headers: {
          //     accept: 'application/vnd.github.mercy-preview+json'
          // }
        })
        .then(data => { res.send(data) })
        .catch(e => { res.send(e) })
    })

    router.get('/orgs/:orgSlug/members', verifyToken, getGithubUserToken, (req, res) => {
      let orgSlug = req.params.orgSlug
      let page = req.query.page || 1

      github.authenticate({
        type: 'token',
        token: res.locals.oauthToken
      })

      github.orgs
        .getMembers({
          org: orgSlug,
          page: page
        })
        .then(data => { res.send(data) })
        .catch(e => { res.send(e) })
    })

    router.get('/orgs/:orgSlug/repos', verifyToken, getGithubUserToken, (req, res) => {
      let orgSlug = req.params.orgSlug
      let page = req.query.page || 1

      github.authenticate({
        type: 'token',
        token: res.locals.oauthToken
      })

      github.repos
        .getForOrg({
          org: orgSlug,
          page: page
        })
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

    return router;
})();
