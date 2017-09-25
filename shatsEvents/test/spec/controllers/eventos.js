'use strict';

describe('Controller: EventosCtrl', function () {

  // load the controller's module
  beforeEach(module('appSha'));

  var EventosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventosCtrl = $controller('EventosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EventosCtrl.awesomeThings.length).toBe(3);
  });
});
