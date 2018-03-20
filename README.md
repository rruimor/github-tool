# GitHub Tools

This is an example project that proxies the GitHub API to check the latests commits of the collaborators of the repos from the organizations the user belongs to.

Live [demo](https://shielded-caverns-50464.herokuapp.com/)

It uses NodeJS + Express for the backend and VueJS for the front-end. 

PassportJS is also used to authenticate a GitHub user and request an OauthToken to access its private API.

## How to start

Add a .env file with your PORT, GITHUB_ID, GITHUB_SECRET and APP_URL like this:

``` bash
PORT=3000
GITHUB_ID=<% YOUR_GITHUB_ID %>
GITHUB_SECRET=<% YOUR_GITHUB_SECRET %>
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


## Disclaimer

This project was based on [MEVN Boilerplate With Authentication](https://github.com/antonderegt/mevn-github-auth) from [Anton de Regt](https://github.com/antonderegt).
