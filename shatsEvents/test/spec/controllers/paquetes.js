'use strict';

describe('Controller: PaquetesCtrl', function () {

  // load the controller's module
  beforeEach(module('appSha'));

  var PaquetesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PaquetesCtrl = $controller('PaquetesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PaquetesCtrl.awesomeThings.length).toBe(3);
  });
});
