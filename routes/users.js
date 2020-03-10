var express = require('express');
var router = express.Router();
var query = require('../db/connector');
var users = {1 : 'user1', 2: 'user2', 3: 'user3'};

/* GET users listing. */
router.get('/users', function (req, res, next) {
  var result;
  query.query('SELECT * from playground').then((data)=> {
    console.log('data ' + JSON.stringify(data.rows));
    res.send('respond with a resource 1111asdf' + users[1] + ' result : ' + data.rows);
    result = data;
  });
});

module.exports = router;
