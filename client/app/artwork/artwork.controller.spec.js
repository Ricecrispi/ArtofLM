'use strict';

describe('Controller: ArtworkCtrl', function () {

  // load the controller's module
  beforeEach(module('artOfLmApp'));

  var ArtworkCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArtworkCtrl = $controller('ArtworkCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
