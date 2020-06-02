'use strict';

const mongoose = require('mongoose');

const prod = mongoose.Schema({
  name : {type: String, required: true},
  category : {type: String, required: true},
  display_name: {type: Number, required: true},
  description: {type: Number, required: true},
});

module.exports = mongoose.model('prod', prod);
