var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();



var bodyParser = require('body-parser');
//config body-parser library
app.use(bodyParser.urlencoded({ extended: false }));

var productRouter = require('./routes/product');
app.use('/product', productRouter);

var categoryRouter = require('./routes/category');
app.use('/category', categoryRouter);

//import mongoose library
var mongoose = require('mongoose');
//config database connection + database name
var database = "mongodb+srv://kimquang2001:1234uioP@kimquang.q6diobs.mongodb.net/ToyShopDB";
//connect to database
mongoose.connect(database)
  .then(() => console.log("Connect to DB success"))
  .catch ((err) => console.error("Connect to DB failed" + err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Handlebars Website',
    message: 'Welcome to my Handlebars website!'
  });
});

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


app.listen(process.env.PORT || 3001);
module.exports = app;
