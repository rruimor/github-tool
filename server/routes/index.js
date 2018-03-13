const express = require('express'),
      router = express.Router(),
      path = require('path')

const jwt = require('jsonwebtoken');

router.get('/isauth', (req, res, next) => {
  // res.send(req.user)

  if (!req.user) {
    return res.status(200).send( { auth: false })
  }

  var token = jwt.sign({ id: req.user._id }, process.env.SECRET, {
    expiresIn: 86400 // expires in 24 hours
  });

  res.status(200).send({ auth: true, token: token });
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/');
})

router.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'))
});

module.exports = router
