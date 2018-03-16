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
    return done(null, {accessToken, profile})
  }))
}
