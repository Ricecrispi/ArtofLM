'use strict';

describe('Service: artwork', function () {

  // load the service's module
  beforeEach(module('artOfLmApp'));

  // instantiate service
  var artwork;
  beforeEach(inject(function (_artwork_) {
    artwork = _artwork_;
  }));

  it('should do something', function () {
    expect(!!artwork).toBe(true);
  });

});
