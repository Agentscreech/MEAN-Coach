var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'static/index.html'));
});

var server = app.listen(process.env.PORT || 3000);
