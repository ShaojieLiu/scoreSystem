var express = require('express');
var app = express();
var port = 3001;

app.use('/', express.static('build'))

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});