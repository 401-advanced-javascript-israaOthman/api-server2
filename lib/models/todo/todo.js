'use strict';

const Model = require('../GlobalModel');
const schema = require('./todoSchema');


class Todo extends Model{
  constructor(){
    super(schema);
  }
}

module.exports = new Todo(); 
