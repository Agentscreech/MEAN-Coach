//Dependencies
require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');

//JSON web token dependencies including secret keyboard
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = process.env.JWT_SECRET;


//Mongoose models and connection
var mongoose = require('mongoose');
var User = require('./models/user');
var Activity = require('./models/activity');
var Log = require('./models/log');
mongoose.connect('mongodb://localhost/meancoach');

//Setup Path directory (static)
app.use(express.static(path.join(__dirname, 'static')));

//Decode POST data in JSON and URL encoded formats
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Observe server activity
app.use(require('morgan')('dev'));

//Restrict access unless the user passes the expressJWT
app.use('/api/profile', expressJWT({ secret: secret }), require('./controllers/profile'));
app.use('/api/users', expressJWT({ secret: secret }).unless({
  path: [{ url: '/api/users', methods: ['POST'] }]
}), require('./controllers/users'));

//GET routes to retrieve activities
//Get all activities
app.use('/api/activities', require('./controllers/activities'));
//Get activities matching search term
app.use('/api/activities/search', require('./controllers/activities'));

//Middleware to check if expressJWT did not authorize the user and display error message
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: 'You need an authorization token to view this information.' });
  }
});

//bring in non secure controllers

app.use('/api/activities', require('./controllers/activities'));
app.use('/api/foods', require('./controllers/foods'));


//POST route - if authenticated, return a signed JWT
app.post('/api/auth', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    //Return 401 if error or no user found
    if (err || !user) return res.status(401).send({ message: 'User not found'});

    //Attempt to authenticate user
    var isAuthenticated = user.authenticated(req.body.password);
    //Return 401 if invalid password or error
    if (err || !isAuthenticated) return res.status(401).send({ message: 'User is not authenticated' });

    //Sign the JWT with the user payload and secret
    var token = jwt.sign(user.toJSON(), secret);
    return res.send({ user: user, token: token });
  });
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'static/index.html'));
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
