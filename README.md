# GitHub Tools

MEVN stack project example based on [antonderegt](https://github.com/antonderegt) [mevn-boilerplate](https://github.com/antonderegt/mevn-boilerplate) to check the stats on the repos of the GitHub organizations that you're part of.

Live [demo](https://shielded-caverns-50464.herokuapp.com/)


## About

It uses PassportJS to authenticate a user with GitHub and request and OauthToken.

## How to start

Add a .env file with your PORT, MONGO_URI, GITHUB_ID, GITHUB_SECRET and APP_URL like this:

``` bash
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/voting-app
GITHUB_ID=233245n234566kjh243f
GITHUB_SECRET=k2hj432kjgjkh2g34kj2g4jkh23g4jk2342jhg34
APP_URL=http://127.0.0.1:3000/
```

After that execute the following:

``` bash

# install dependencies
npm install

# build and watch for changes
npm run serve

# run in a seperate terminal to serve at localhost:3000
nodemon server.js

# build for production with minification
npm run build
```
