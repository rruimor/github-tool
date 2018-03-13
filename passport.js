const GitHubStrategy = require('passport-github').Strategy,
      User = require('./server/models/user')

module.exports = function (passport) {
  passport.serializeUser(function(user, done) {
    done(null, user)
  })

  passport.deserializeUser(function(user, done) {
    done(null, user)
  })

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.APP_URL+'auth/github/callback',
    scope: ['user:email', 'repo', 'read:org']
  },
  function(accessToken, refreshToken, profile, done) {

    User.findOne({ 'id': profile.id }, function (err, user) {
      if (err) {
        return done(err)
      }

      if (user) {
        return done(null, user)
      } else {
        var newUser = new User()

        // TODO Store encoded OauthToken
        // var hashedOauthToken = bcrypt.hashSync(req.body.password, 8)

        newUser.id = profile.id
        newUser.username = profile.username
        newUser.displayName = profile.displayName
        newUser.oauthToken = accessToken

        newUser.save(function (err) {
          if (err) {
            throw err
          }

          return done(null, profile)
        })
      }
    })
  }))
}
