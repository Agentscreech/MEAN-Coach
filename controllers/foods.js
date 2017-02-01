var express = require('express');
var router = express.Router();
var request = require('request');


// Proxy to get search results from USDA API
router.get('/foodresults', function(req, res) {

  var term = req.query.searchTerm;
  var url = "http://api.nal.usda.gov/ndb/search/?format=json&q=" + term + "&sort=n&max=25&offset=0&api_key=voDReYpFIe0hJoOxgqqfGU28oUAf3Yp1HbsfOGEg";
  //res.send(url);

  request(url, function(error, response, body) {
    res.send(body);
  });
});

//Proxy to send API request to USDA API
router.get('/addfood', function(req, res) {

  var id = req.query.foodId;
  var url = "https://api.nal.usda.gov/ndb/reports/?ndbno=" + id + "&type=b&format=json&api_key=voDReYpFIe0hJoOxgqqfGU28oUAf3Yp1HbsfOGEg";
  //res.send(url);

  request(url, function(error, response, body) {
    res.send(body);
  });
});


module.exports = router;
