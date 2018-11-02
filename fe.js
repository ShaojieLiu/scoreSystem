var express = require('express');
var app = express();
var port = 3002;

app.use('/static', express.static('rank_it/build'));

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});