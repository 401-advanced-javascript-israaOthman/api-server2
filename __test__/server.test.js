'use strict';
const supergoose = require('@code-fellows/supergoose');
const {server} = require('../lib/server');
const supertest = require('supertest');
const mockRequest = supertest(server);
const mockRequest2 = supergoose(server);



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


  it('it can get() product ', ()=> {
    let obj = {
      'name': 'test',
      'category' : 'test cat',
      'display_name': 'testttt',
      'description': 'The latest tests',
    };
    return mockRequest2
      .post('/products')
      .send(obj)
      .then(data => {
        return mockRequest2.get('/products')
          .then(result => {
            Object.keys(obj).forEach(key=> {
              expect(result.body[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('it can post() product ', ()=> {
    let obj = {
      'name': 'test',
      'category' : 'test cat',
      'display_name': 'testttt',
      'description': 'The latest tests',
    };
    return mockRequest2
      .post('/products')
      .send(obj)
      .then(data => {
        expect(data.status).toBe(201);
        Object.keys(obj).forEach(key=> {
          expect(data.body[key]).toEqual(obj[key]);
        });
        
      });
  });


  it('it can get() category ', ()=> {
    let obj = {
      'name': 'test',
      'display_name': 'testttt',
      'description': 'The latest tests',
    };
    return mockRequest2
      .post('/api/v1/categories') 
      .send(obj)
      .then(data => {
        return mockRequest2.get('/api/v1/categories')
          .then(result => {
            Object.keys(obj).forEach(key=> {
              expect(result.body[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('it can post() category ', ()=> {
    let obj = {
      'name': 'test',
      'display_name': 'testttt',
      'description': 'The latest tests',
    };
    return mockRequest2
      .post('/api/v1/categories')
      .send(obj)
      .then(data => {
        console.log(data.body);
        expect(data.status).toBe(201);
        Object.keys(obj).forEach(key=> {
          expect(data.body[key]).toEqual(obj[key]);
        });
        
      });
  });

});