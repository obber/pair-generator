var c = require("./common");
var app = c.app;
var fs = require("fs");
var path = require("path");
var shortid = require('shortid');

app.get('/txt/*', (req, res) => {
  console.log('req.url = ', req.url);
  var fileToGet = req.url + '.txt';
  var filePath = path.join(__dirname, '..' + fileToGet);
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.redirect("/error.html");
      return;
    }

    res.sendFile(filePath);
  });
});

app.post('/txt/create', (req, res) => {
  var id = shortid.generate();
  var txtfile = "";
  var results = req.body;
  results.forEach((sprints, index) => {
    txtfile += "sprint " + (index + 1) + "\n";
    sprints.forEach(pair => {
      txtfile += pair.join(" | ") + "\n";
    });
    txtfile += "\n";
  });

  fs.writeFile('txt/' + id + '.txt', txtfile, (err) => {
    if (err) {
      res.json({ success: false, err: err });
      throw err;
    }

    res.json({ success: true, id: id });
  });
});
