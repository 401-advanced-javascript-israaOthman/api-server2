'use strict';

const mongoose = require('mongoose');

const todo = mongoose.Schema({
  text : {type: String, required: true},
  difficulty : {type: Number , default:1 },
  assignee:{type:String, required: true},
  complete : {type:String , default:'pending' , enum:['pending','complete']},
});

module.exports = mongoose.model('todo', todo);
