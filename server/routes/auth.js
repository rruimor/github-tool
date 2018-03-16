const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      jwt = require('jsonwebtoken')


router.get('/', (req, res, next) => {

  if (!req.user) {
    return res.status(200).send( { auth: false })
  }

  const expiresIn = 86400 // 24h

  let token = jwt.sign({ oauthToken: req.user.accessToken }, process.env.SECRET, { expiresIn }, (err, token) => {
    res.status(200).send({
      token: token,
      expiresIn: expiresIn,
      displayName: req.user.profile.displayName,
    });
  });
})

router.get('/github',
  passport.authenticate('github'))

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/')
  })

module.exports = router
