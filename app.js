var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var validator = require('express-validator');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);
var port = process.env.PORT || 8000;
var mongohost = process.env.MONGODBHOST || 'localhost';
var mongoport = process.env.MONGODBPORT || 27017;
var mongodbcollection = process.env.MONGODBNAME || 'pharmacyApp';

var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
var mongoHost = process.env[mongoServiceName + "_SERVICE_HOST"] || 'localhost';
var mongoPort = process.env[mongoServiceName + "_SERVICE_PORT"] || 27017;
console.log("mongohost:port ="+mongoHost+":"+mongoPort);


var app = express();

var pharmacyappRoutes = require('./routes/pharmacy');
var userRoutes = require('./routes/user');

//mongoose.connect('localhost:mongoport/pharmacyApp');

//mongoose.connect(mongohost+':'+mongoport+'/'+mongodbcollection);

mongoose.connect('mongodb://'+process.env.MONGODB_USER+':'+process.env.MONGODB_PASSWORD+'@'+mongoHost+':'+mongoPort+'/'+process.env.MONGODB_DATABASE)
require('./config/passport');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(function(req, res, next) {
   req.session.cookie.maxAge = 180 * 60 * 1000; // 3 hours
    next();
});
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use('/user', userRoutes);
app.use('/ecomm', pharmacyappRoutes);
app.get('/', function(req, res) {
res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
// error hndlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

app.listen(port);
console.log("App listening on port " + port);

module.exports = app;
