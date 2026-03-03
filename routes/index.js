var express = require('express');
var router = express.Router();

/* GET home page. */
//localhost:3000
router.get('/', function(req, res, next) {
  res.send({ message: 'Welcome to NNPTUD API', status: 'running' });
});
//localhost:3000
router.get('/home', function(req, res, next) {
  res.send({ message: 'Welcome to NNPTUD API', status: 'running' });
});


module.exports = router;


//mongodb
