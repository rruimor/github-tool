const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Get App API Token
  let token = req.headers['x-access-token']

  // Return if no token found
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  // Decode API Token to get User ID
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    // res.locals.userId = decoded.id
    res.locals.oauthToken = decoded.oauthToken
    next();
  });
}

module.exports = verifyToken;