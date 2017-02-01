var express = require('express');
var Activity = require('../models/activity').Activity;
var router = express.Router();

router.route('/').get(function(req, res) {
  console.log("GETTING ACTIVITES", req.body)
  Activity.find({}, function(err, activities) {
    console.log("error?", err);
    if (err) return res.send(err);
    console.log("SENDING ACTIVITIES", activities);
    res.send(activities);
  });
});

// router.route('/').get(function(req, res) {
//   models.Activity.find({}, function(err, activities) {
//     console.log(activities);
//     res.send(activities);
//   });
// });

module.exports = router;
