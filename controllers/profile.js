var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.route('profile/:id')
  .get(function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if (err) return res.status(500).send(err);

      return res.send(user);
    });
  })

module.exports = router;
