'use strict';

const mongoose = require('mongoose');

const cat = mongoose.Schema({
  name : {type: String, required: true},
  display_name: {type: Number, required: true},
  description: {type: Number, required: true},
});

module.exports = mongoose.model('cat', cat);

