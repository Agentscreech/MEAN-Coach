var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.route('/:id')
.get(function(req, res) {
  User.findById(req.params.id, function(err, log) {
    if (err) return res.status(500).send(err);
    console.log('returning ', log.logs);
    return res.send(log.logs);
  });
})
.put(function(req,res){
  User.findById(req.body.user_id, function(err,user){
    console.log('trying to store', req.body.logs);
    console.log('is it an array? ', Array.isArray(req.body.logs));
    console.log('before push',user.logs);
    // if(err){
    //   console.log('error', err);
    //   return (err);
    // }
    // if (user.logs == []){
    //
    // } else {
    user.logs.push(req.body.logs);
    user.save(function(err){
      if (err){
        res.send(err);
      } else {
        res.send('ok');
      }
    });
    console.log('after push',user.logs);
  });
})
// .put(function(req,res){
//   console.log('trying to update', req.params.id);
//   User.findByIdAndUpdate(req.params.id, req.body, function(err){
//     if (err) return res.status(500).send(err);
//     return res.send({message: 'success'});
//   });
// })
.delete(function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);

      return res.send({ message: 'success' });
    });
  });

module.exports = router;
