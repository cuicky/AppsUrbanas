'use strict';

/**
 * @ngdoc function
 * @name appSha.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appSha
 */
angular.module('appSha')
  .controller('ClientesCtrl',['$scope','$firebaseObject','$uibModal','$firebaseArray', function ($scope,$firebaseObject,$uibModal,$firebaseArray) {
    var self = this;

    var ref = firebase.database().ref("/clientes");
    var list = $firebaseArray(ref);
    list.$loaded()
       .then(function(){
           $scope.clientes = list
       });

    self.addClient = function(){
      $uibModal.open({
        templateUrl: 'views/app/modals/addClient.html',
        size: 'lg',
        controller: function($scope,$uibModalInstance) {
          var re2 = firebase.database().ref("/paquetes");
          var lis2 = $firebaseArray(re2);
          lis2.$loaded()
             .then(function(){
                 $scope.paquetes = lis2
                 $scope.newClient = {
                   name:"",
                   email:"",
                   phone : "",
                   password:"",
                   paquete:$scope.paquetes[0].$id,
                   ubicacion:"",
                   boletos:0,
                   alergicos:0,
                   diabeticos:0,
                   vegetarianos:0,
                   ninos:0
                 }
             });



          $scope.ok = function(){
            firebase.database().ref("clientes").push($scope.newClient)
            $uibModalInstance.close();
          }

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
        }
      });
    }
  }]);
