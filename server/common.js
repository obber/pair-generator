var express = require('express');
var app = express();

app.use(require('body-parser').json());

module.exports = {
  express: express,
  app: app,
}
