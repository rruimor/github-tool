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
