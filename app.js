var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var jzwRouter = require('./routes/jzw');
var hlwRouter = require('./routes/hlw');
var wxRouter = require('./routes/wx');
var auditRouter = require('./routes/audit');
var siteRouter = require('./routes/site');
var resourceRouter = require('./routes/resource');
var specialRouter = require('./routes/special');
var surroundRouter = require('./routes/surround');
var videoRouter = require('./routes/video');
var dataRouter = require('./routes/data');
var toolRouter = require('./routes/tool');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/jzw', jzwRouter);
app.use('/hlw', hlwRouter);
app.use('/wx', wxRouter);
app.use('/audit', auditRouter);
app.use('/site', siteRouter);
app.use('/resource', resourceRouter);
app.use('/special', specialRouter);
app.use('/surround', surroundRouter);
app.use('/video', videoRouter);
app.use('/data', dataRouter);
app.use('/tool', toolRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
