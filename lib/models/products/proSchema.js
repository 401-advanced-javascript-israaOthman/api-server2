'use strict';

const mongoose = require('mongoose');

const prod = mongoose.Schema({
  name : {type: String, required: true},
  category : {type: String, required: true},
  price : {type:Number,required: false},
  inStock:{type:Number,required: false},
  img:{type:String},
  display_name: {type: String, required: false},
  description: {type: String, required: false},
});

module.exports = mongoose.model('prod', prod);
