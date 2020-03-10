// var indexRouter = require('./index');
// var router = require('./users');
var express = require('express');
var router = express.Router();

router.use(require('./users'));
router.use(require('./index'));

module.exports = router;