var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.route('/').get(function(err, users) {
  User.find(function(err, users) {
    if (err) return res.status(500).send(err);

    return res.send(users);
  });
})
.post (function(req, res) {

  //Find user in case email already exists
  User.findOne({ email: req.body.email }, function(err, user) {
    if(user) return res.status(400).send({ message: 'Email already exists'});

    User.create(req.body, function(err, user) {
      if (err) return res.status(500).send(err);

      return res.send(user);
    });
  });
});

router.route('/:id')
.get(function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return res.status(500).send(err);
    return res.send(user);
  });
});
router.route('/:id/userSettings')
.get(function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return res.status(500).send(err);
    return res.send(user);
  });
})
.put(function(req,res){
  console.log('trying to update', req.params.id);
  User.findByIdAndUpdate(req.params.id, req.body, function(err){
    if (err) return res.status(500).send(err);
    return res.send({message: 'success'});
  });
})
.delete(function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);

      return res.send({ message: 'success' });
    });
  });

module.exports = router;
