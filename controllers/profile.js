var express = require('express');
var User = require('../models/user');
var router = express.Router();

//This appends onto base URL listed in index.js
router.route('/:id')
  .get(function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if (err) return res.status(500).send(err);
      console.log(req, res);
      //This removes user password from user object
      // delete user.password;
      return res.send(user);
    });
  })

module.exports = router;
