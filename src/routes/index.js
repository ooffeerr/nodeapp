var express = require('express');
var router = express.Router();
var requestHandler = require('../lib/requestHandler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('It is alive!!!');
});

router.post('/words', ((req, res) => {
  // `req` is an http.IncomingMessage, which is a Readable Stream.
  // `res` is an http.ServerResponse, which is a Writable Stream.

  console.log('req.query = ' + JSON.stringify(req.query));
  requestHandler(req, res);
}));

module.exports = router;
