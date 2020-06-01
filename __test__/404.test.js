'use strict';

const notFound = require('../middleware/404');

describe('404 middleware', () => {

  let req = {};
  let res =  { status: function (s) { this.status = s; return this; }, send: () => { } };
  let next = jest.fn(); 


  it ('should response with notFound 404  .. ', ()=> {
    notFound(req, res, next);
    expect(res.status).toBe(404);
  });

});