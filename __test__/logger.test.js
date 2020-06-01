'use strict';

const loggerMiddleWare = require('../middleware/logger');

describe('logger middleware', () => {

  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn();
 
  beforeEach(()=> {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(()=> {
    consoleSpy.mockRestore();
  });

  it ('console log something .. ', ()=> {
    loggerMiddleWare(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('moves to next .. ', ()=> {
    loggerMiddleWare(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });


});