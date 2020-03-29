var express = require('express');
var router = express.Router();
var requestHandler = require('../lib/requestHandler');
var statistics = require('../lib/statistics')();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('It is alive!!!');
});

router.post('/words', ((req, res) => {
  // `req` is an http.IncomingMessage, which is a Readable Stream.
  // `res` is an http.ServerResponse, which is a Writable Stream.

  console.log('req.query = ' + JSON.stringify(req.query));
  requestHandler(req, res);
}));

router.get('/statistics', ((req, res) => {
  var word = req.query['word'];
  console.log('querying for ' + word);
  var count = statistics.count(word);
  if (count) {
    res.write(JSON.stringify(count));
    res.end();
  }
  else {
    res.write('0');
    res.end();
  }
}));
module.exports = router;
