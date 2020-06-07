'use strict';
const supergoose = require('@code-fellows/supergoose');

const pro = require('../lib/models/products/products');

let obj =     {
  'name': 'test',
  'category' : 'test cat',
  'display_name': 'testttt',
  'description': 'The latest tests',
};

let obj2 =     {
  'name': 'test2',
  'category' : 'test cat2',
  'display_name': 'testttt',
  'description': 'The latest tests2',
};

describe('Product Model', () =>{
  let id;
  it('can post() a product', ()=> {
    return pro.create(obj)
      .then(record => {
        id=record._id;
        Object.keys(obj).forEach(key=> {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('can get() products', ()=> {
    return pro.read()
      .then(results => {
        Object.keys(obj).forEach(key=> {
          expect(results[0][key]).toEqual(obj[key]);
        });
      });
  });

  it('can get:id() a product', ()=> {
    return pro.read(id)
      .then(results => {
        Object.keys(obj).forEach(key=> {
          expect(results[0][key]).toEqual(obj[key]);
        });
      });
  });

  it('can update() product', ()=> {
    return pro.update(id,obj2)
      .then(result => {
        Object.keys(obj2).forEach(key=> {
          expect(result[key]).toEqual(obj2[key]);
        });
      });
  });

  
  it('can delete() product', ()=> {
    return pro.delete(id)
      .then(result => {
        Object.keys(obj2).forEach(key=> {
          expect(result[key]).toEqual(obj2[key]);
        });
      });
  });
});