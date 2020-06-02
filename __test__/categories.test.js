'use strict';
const supergoose = require('@code-fellows/supergoose');

const cat = require('../lib/models/categories/catCollection');

let obj =     {
  'name': 'test',
  'display_name': 'testttt',
  'description': 'The latest tests',
};

let obj2 =     {
  'name': 'test2',
  'display_name': 'testttt2',
  'description': 'The latest tests2',
};

describe('Category Model', () =>{
  let id;
  it('can post() a category', ()=> {
    return cat.create(obj)
      .then(record => {
        id=record._id;
        Object.keys(obj).forEach(key=> {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('can get() category', ()=> {
    return cat.read()
      .then(results => {
        Object.keys(obj).forEach(key=> {
          expect(results[0][key]).toEqual(obj[key]);
        });
      });
  });

  it('can get:id() a category', ()=> {
    return cat.read(id)
      .then(results => {
        Object.keys(obj).forEach(key=> {
          expect(results[0][key]).toEqual(obj[key]);
        });
      });
  });

  it('can update() category', ()=> {
    return cat.update(id,obj2)
      .then(result => {
        Object.keys(obj2).forEach(key=> {
          expect(result[key]).toEqual(obj2[key]);
        });
      });
  });

  
  it('can delete() category', ()=> {
    return cat.delete(id)
      .then(result => {
        Object.keys(obj2).forEach(key=> {
          expect(result[key]).toEqual(obj2[key]);
        });
      });
  });
});