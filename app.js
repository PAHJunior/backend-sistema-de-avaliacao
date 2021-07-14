var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose")
require('dotenv').config()

var app = express();

mongoose
	.connect("mongodb+srv://root:BbTh1xW3LWy2vXcE@cluster0.vy6w4.mongodb.net/demarco", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
	.then(() => {
		console.log("Server has started!")
	})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./src/routes/index'));
app.use('/teachers', require('./src/routes/Teachers'));
app.use('/auth', require('./src/routes/Auth'));

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
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
