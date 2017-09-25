'use strict';

describe('Controller: NuevosCtrl', function () {

  // load the controller's module
  beforeEach(module('appSha'));

  var NuevosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NuevosCtrl = $controller('NuevosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NuevosCtrl.awesomeThings.length).toBe(3);
  });
});
