var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pet = new Schema({
  name: String,
  type: String,
  age: Number
});

module.exports = mongoose.model('pet', Pet);
