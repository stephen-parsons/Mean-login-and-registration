var express = require('express');
var session = require('express-session')
var app = express();
var mongoose = require('mongoose');
var flash = require('connect-flash');
app.use(flash());
app.use(session({secret: 'parsonss'}));
mongoose.connect('mongodb://localhost/users');
mongoose.Promise = global.Promise;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(express.static(path.join(__dirname, './client/static')));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');
require('./server/config/mongoose.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(8000, function() {
    console.log("listening on port 8000");
});