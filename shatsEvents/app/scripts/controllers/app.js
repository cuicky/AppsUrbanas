'use strict';

/**
 * @ngdoc function
 * @name appSha.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the appSha
 */
angular.module('appSha')
  .controller('AppCtrl',['$scope','localStorageService','$state', function ($scope,localStorageService,$state) {
    var self = this;
     self.email = localStorageService.get("email");
     self.id = localStorageService.get("id");

     $scope.logout = function(){
       localStorageService.clearAll();
       $state.go("login")
     }
  }]);
