var express = require('express');
var router = express.Router();
var Pet = require('../models/pets');

router.get('/pets', function(req, res, next){
  Pet.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});


router.get('/pet/:id', function(req, res, next){
  Pet.findById(req.params.id, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});


router.post('/pets', function(req, res, next){
  newPet = new Pet({
    name: req.body.name,
    type: req.body.type,
    age: req.body.age
  });
  newPet.save(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json({'SUCCESS': data});
    }
  });
});


router.put('/pet/:id', function(req, res, next){
  var update = {
    name: req.body.name,
    type: req.body.type,
    age: req.body.age
  };
  var options = {new:true};
  Pet.findByIdAndUpdate(req.params.id, update, options, function(err, data){
    if (err){
      res.json({'message': err});
    } else{
      res.json({'UPDATED': data});
    }
  });
});


router.delete('/pet/:id', function(req, res, next){
  Pet.findByIdAndRemove(req.params.id, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json({'REMOVED': data});
    }
  });
});




module.exports = router;
