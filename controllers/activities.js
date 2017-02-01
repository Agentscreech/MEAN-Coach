var express = require('express');
var Activity = require('../models/activity').Activity;
var router = express.Router();

router.route('/').get(function(req, res) {
  // console.log("GETTING ACTIVITES", req.body)
  Activity.find({}, function(err, activities) {
    console.log("error?", err);
    if (err) return res.send(err);
    // console.log("SENDING ACTIVITIES", activities);
    res.send(activities);
  });
});

router.route('/search/:searchterm').get(function(req, res) {
  console.log("Searching for: ", req.params.searchterm);
  Activity.find({ "name": { "$regex": req.params.searchterm, "$options": "i" } },
  function(err,activities) {
    console.log("Partial match results: ", activities);
    res.send(activities);
  });
});

module.exports = router;
