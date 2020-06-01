'use strict';

const timestamp = require('../middleware/timestamp');

describe('timestamp middleware', () => {

  let req = {};
  let res = {};
  let next = jest.fn();
  let d = new Date();
  let dateTime = d.toLocaleDateString();

  it ('add requestTime as an object in a property to the request  .. ', ()=> {
    timestamp(req, res, next);
    expect(req.requestTime).toEqual(dateTime);
  });

  it('moves to next .. ', ()=> {
    timestamp(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });


});