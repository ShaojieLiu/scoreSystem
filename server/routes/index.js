var express = require('express');
var router = express.Router();
var path = require('path');
var {publicPath} = require('../env')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  // res.sendFile(path.join(__dirname, '../../rank_it/build/index.html'));
  // res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = router;
