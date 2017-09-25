'use strict';

/**
 * @ngdoc function
 * @name appSha.controller:EventosCtrl
 * @description
 * # EventosCtrl
 * Controller of the appSha
 */
angular.module('appSha')
  .controller('EventosCtrl',['$scope','$firebaseArray','$firebaseObject','$uibModal','$q',function ($scope,$firebaseArray,$firebaseObject,$uibModal,$q) {
    var self = this;

    var ref = firebase.database().ref("/eventos");
    var list = $firebaseArray(ref);
    var promiseList = [];
    // console.log(list);
    list.$loaded()
       .then(function(itm){
         $scope.eventos = list;
         angular.forEach(list, function(itm) {

           var refe = firebase.database().ref("/paquetes/"+itm.paquete);
           var ob = $firebaseObject(refe);
           ob.$loaded().then(function() {
              itm.paquete=ob
           });

           var refer = firebase.database().ref("/clientes/"+itm.client);
           var obj = $firebaseObject(refer);
           obj.$loaded().then(function() {
              itm.client=obj
           });
        })
       });

    self.addEvent = function(){
      $uibModal.open({
        templateUrl: 'views/app/modals/addEvent.html',
        size: 'lg',
        controller: function($scope,$uibModalInstance) {
          var ref = firebase.database().ref("/clientes");
          var list = $firebaseArray(ref);
          list.$loaded()
             .then(function(){
                 $scope.clientes = list
                 $scope.newEvent = {
                   name:"El mejor evento",
                   client:$scope.clientes[0].$id,
                   ubic : "Centro",
                   number:50,
                   alergicos:0,
                   alergia:"",
                   diabeticos:0,
                   vegetarianos:0
                 }
             });

             var ref2 = firebase.database().ref("/paquetes");
             var list2 = $firebaseArray(ref2);
             list2.$loaded()
                .then(function(){
                    $scope.paquetes = list2
                    $scope.newEvent = {
                      name:"El mejor evento",
                      client:$scope.clientes[0].$id,
                      paquete:$scope.paquetes[0].$id,
                      ubic : "Centro",
                      number:50,
                      alergicos:0,
                      alergia:"a la aspirina",
                      diabeticos:0,
                      vegetarianos:0
                    }
                });



          $scope.ok = function(){
            firebase.database().ref("eventos").push($scope.newEvent)
            $uibModalInstance.close();
          }

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
        }
      });
    }
  }]);
