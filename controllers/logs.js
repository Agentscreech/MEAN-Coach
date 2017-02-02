var express = require('express');
var Log = require('../models/user');
var router = express.Router();

router.route('/:id')
.get(function(req, res) {
  Log.findById(req.params.id, function(err, log) {
    if (err) return res.status(500).send(err);
    return res.send(log);
  });
})
.put(function(req,res){
  console.log('trying to store', req.body);
  Log.findById(req.params.id, req.body, function(err,log){
    if(err){
      console.log('error', err);
      return (err);
    }
    Log.logs.push(req.body);
    Log.save();
    console.log('after create',log);
    return res.send(log);
  });
})
// .put(function(req,res){
//   console.log('trying to update', req.params.id);
//   Log.findByIdAndUpdate(req.params.id, req.body, function(err){
//     if (err) return res.status(500).send(err);
//     return res.send({message: 'success'});
//   });
// })
.delete(function(req, res) {
    Log.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);

      return res.send({ message: 'success' });
    });
  });

module.exports = router;
