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


module.exports = router;
