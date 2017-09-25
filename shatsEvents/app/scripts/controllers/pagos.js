'use strict';

/**
 * @ngdoc function
 * @name appSha.controller:PagosCtrl
 * @description
 * # PagosCtrl
 * Controller of the appSha
 */
angular.module('appSha')
  .controller('PagosCtrl',['$scope','$firebaseArray','$uibModal','$firebaseObject',function ($scope,$firebaseArray,$uibModal,$firebaseObject) {
    var self = this;

    var ref = firebase.database().ref("/pagos");
    var list = $firebaseArray(ref);
    list.$loaded()
       .then(function(){
           $scope.pagos = list;

           angular.forEach(list, function(itm) {

             var refe = firebase.database().ref("/clientes/"+itm.cliente);
             var ob = $firebaseObject(refe);
             ob.$loaded().then(function() {
                itm.cliente=ob
             });
             console.log(itm.evento);
             var refer = firebase.database().ref("/eventos/"+itm.evento);
             var obj = $firebaseObject(refer);
             obj.$loaded().then(function() {
              //  console.log(obj);
                itm.evento=obj
             });
          })
       });

    self.addPago = function(){
      $uibModal.open({
        templateUrl: 'views/app/modals/addPago.html',
        size: 'sm',
        controller: function($scope,$uibModalInstance) {
          var ref = firebase.database().ref("/clientes");
          var list = $firebaseArray(ref);
          list.$loaded()
             .then(function(){
                 $scope.clientes = list
             });

             var ref2 = firebase.database().ref("/eventos");
             var list2 = $firebaseArray(ref2);
             list2.$loaded()
                .then(function(){
                    $scope.eventos = list2
                    $scope.newPago = {
                      cliente:$scope.clientes[0].$id,
                      evento:$scope.eventos[0].$id,
                      cantidad:500
                    }
                });

          $scope.ok = function(){
            firebase.database().ref("pagos").push($scope.newPago)
            $uibModalInstance.close();
          }

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
        }
      });
    }
  }]);
