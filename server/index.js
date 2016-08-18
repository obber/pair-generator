var c = require("./common");
var app = c.app;
var express = c.express;

app.use(express.static('./public'));

require('./txtify');

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
