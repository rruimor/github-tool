const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      session = require('express-session'),
      auth = require('./server/routes/auth'),
      index = require('./server/routes/index'),
      github = require('./server/routes/api/github')

require('dotenv').load();
require('./passport')(passport)

let app = express()

app.use(express.static(path.join(__dirname, './dist')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'test-secret',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', auth)
app.use('/api/github', github)
app.use('/', index)

const port =  process.env.PORT || 3000;
app.listen(port, () => console.log('Running on localhost:', port))
