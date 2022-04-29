var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//connect-history-api-fallback
const history = require('connect-history-api-fallback');

var indexRouter = require('./routes/index');
const memoRouter = require('./routes/apimemo');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//history는 static 위에 작성함
app.use(history());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/memo', memoRouter);

module.exports = app;
