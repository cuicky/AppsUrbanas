'use strict';

/**
 * @ngdoc function
 * @name appSha.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the appSha
 */
angular.module('appSha')
  .controller('LoginCtrl', ['$scope','$firebaseAuth','localStorageService','$state',function ($scope, $firebaseAuth,localStorageService,$state) {    
    var self = this;
    this.user = {
      email:"ricardo@shatsevents.com",
      password:"fU-5];j}G>,K`sSk"
    }
    this.login = function(){
      var auth = $firebaseAuth()
      auth.$signInWithEmailAndPassword(this.user.email, this.user.password).then(function(firebaseUser) {
        localStorageService.set("email", firebaseUser.email);
        localStorageService.set("id", firebaseUser.uid);
        $state.go("app.clientes",{reload:true})
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    }
  }]);
