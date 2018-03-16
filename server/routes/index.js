const express = require('express'),
      router = express.Router(),
      path = require('path'),
      jwt = require('jsonwebtoken')

router.get('/me', (req, res, next) => {
  let token = req.headers['x-access-token']

  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    res.status(200).send(decoded);
  });
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/');
})

router.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'))
});

module.exports = router
