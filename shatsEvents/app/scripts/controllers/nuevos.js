'use strict';

/**
 * @ngdoc function
 * @name appSha.controller:NuevosCtrl
 * @description
 * # NuevosCtrl
 * Controller of the appSha
 */
angular.module('appSha')
  .controller('NuevosCtrl', function () {
    var self = this;

    self.newUser = {
      name:"Jose",
      email:"jose@gmail.com",
      phone:"4424424454",
      password:"popopopopopo",
      events:{
        numer:12,
        ninos:10,
        alergicos:0,
        diabeticos:0,
        vegetarianos:0
      }
    }
  });
