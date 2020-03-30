var createError = require('http-errors');
import express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
import logger from 'morgan';
var router = require('./routes/routes.js');

const app: express.Application = express();

app.use(express.static('public'));
app.use(router);

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    console.log('Express server started on port: ' + port);
});


module.exports = app;
