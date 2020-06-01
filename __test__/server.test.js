'use strict';

const {server} = require('../lib/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('server', ()=>{
  it('should respond with 500', ()=> {
        
    return mockRequest.get('/bad')
      .then(results=> {
        expect(results.status).toBe(500);
      }).catch(console.error);
  });

  it('should respond 404 of an invalid route',() => {

    return mockRequest
      .get('/anything')
      .then(results => {
        expect(results.status).toBe(404);
      }).catch(console.log);
  });

  it('should respond properly /', ()=> {
    return mockRequest
      .get('/')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should respond properly /categories', ()=> {
    return mockRequest
      .get('/categories')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should respond properly /products', ()=> {
    return mockRequest
      .get('/products')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should respond properly /categories/:id', ()=> {
    return mockRequest
      .get('/categories/1')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should respond properly /products/:id', ()=> {
    return mockRequest
      .get('/products/1')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should post data on categories', ()=> {
    let record ={
      'name': 'Drama-Films',
      'display_name': 'Drama',
      'description': 'The latest Drama films',
    };
    return mockRequest
      .post('/categories')
      .send(record)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should post data on products', ()=> {
    let record ={
      'category': 1,
      'name': 'Avengers EndGame',
      'display_name': 'Marvel',
      'description': 'The last Avengers movie',
      
    };
    return mockRequest
      .post('/products')
      .send(record)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should update specific data on /categories/:id', ()=> {
    let record ={
      'name': 'Drama-Films',
      'display_name': 'Drama',
      'description': 'The latest Drama films',
    };
    return mockRequest
      .put('/categories/1')
      .send(record)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should update specific data on /products/:id', ()=> {
    let record ={
      'category': 1,
      'name': 'Avengers EndGame',
      'display_name': 'Marvel',
      'description': 'The last Avengers movie',
    };
    return mockRequest
      .put('/products/1')
      .send(record)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should delete specific data on /categories/:id', ()=> {
    return mockRequest
      .delete('/categories/1')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should delete specific data on /products/:id', ()=> {
    return mockRequest
      .delete('/products/1')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

});