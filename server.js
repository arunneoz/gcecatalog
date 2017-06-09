var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var app = express();
var productappRoutes = require('./routes/productssvc');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/ecomm', productappRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);
console.log("App listening on port " + port);

module.exports = app;
