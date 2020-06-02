'use strict';

const serverError = require('../middleware/500');

describe('404 middleware', () => {

  let req = {};
  let res =  { status: function (s) { this.status = s; return this; }, send: () => { } };
  let next = jest.fn(); 
  let error = 'error';
  


  it ('should response with 500  .. ', ()=> {
    serverError(error,req, res, next);
    expect(res.status).toBe(500);
  });

});