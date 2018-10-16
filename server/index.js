const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../webpack.config');

const server = express();
const port = 9000;

const compiler = webpack(config);

server.use(webpackDevMiddleware(compiler, {

}));

server.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '..', 'src', 'index.html'));
});

server.listen(port, (error) => {
  if(error) {
    console.log("Error occured while starting server");
  } else {
    console.log("Server started successfully");
  }
});
