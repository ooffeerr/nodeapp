var express = require('express');
var router = express.Router();

var users = {1 : 'user1', 2: 'user2', 3: 'user3'};

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.send('respond with a resource 1111asdf' + users[1]);
});

module.exports = router;
