var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var counter = require('./models/CounterModel');
var app = express();
var PORT = process.env.PORT || 3000;

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/urlshortener");
//Seed the counter database if it doesn't already exist...
counter.findById({_id: 'urlID'}, function(err, id) {
  if (id === null) {
    var urlID = new counter({_id: "urlID"});
    urlID.save(function(err) {
      if (err)
        console.log(err);
    });
  } else if (err) {
    console.log(err);
  } else {
    console.log("Counter already exists :)", id);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});
