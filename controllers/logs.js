var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.route('/:id')
.get(function(req, res) {
  User.findById(req.params.id, function(err, log) {
    if (err) return res.status(500).send(err);
    // console.log('returning ', log.logs);
    return res.send(log.logs);
  });
})
.put(function(req,res){
  User.findById(req.body.user_id, function(err,user){
    // console.log('trying to store', req.body.logs);
    // console.log('is it an array? ', Array.isArray(req.body.logs));
    // console.log('before push',user.logs);
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

.delete(function(req, res) {
    console.log("Delete req.query: ", req.query)
    User.findById(req.params.id, function(err, user) {
      if (err) return res.status(500).send(err);
      for(var i = 0; i < user.logs.length; i++) {
        console.log("LOGS: ", user.logs[i].activities);
        for(var j = 0; j < user.logs[i].activities.length; j++) {
          console.log("ACTIVITIES: ", user.logs[i].activities[j]._id);
          if(user.logs[i].activities[j]._id == Object.keys(req.query)[0]) {
            console.log("Found a match");
            user.logs[i].activities[j].remove({_id: Object.keys(req.query)[0] }, function(err) {
              if (err) console.log(err);
              console.log("DELETED!");
            })
          }
        }
      }
      user.save(function(err){
        if (err){
          res.send(err);
        } else {
          res.send('ok');
        }
      })
      })
    });

module.exports = router;
