'use strict';

const Model = require('../GlobalModel');
const schema = require('./productsSchema');


class Product extends Model{
  constructor(){
    super(schema);
  }
}

module.exports = new Product(); 
