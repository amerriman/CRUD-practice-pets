var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var config = require ('../_config.js');


var Pet = new Schema({
  name: String,
  type: String,
  age: Number
});

module.exports = mongoose.model('pet', Pet);
