var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.sendFile(__dirName + '../build/index.html')
  res.json('123')
});

module.exports = router;
