'use strict';

/**
 * @ngdoc function
 * @name appSha.controller:PaquetesCtrl
 * @description
 * # PaquetesCtrl
 * Controller of the appSha
 */
angular.module('appSha')
  .controller('PaquetesCtrl',['$scope','$firebaseArray','$uibModal', function ($scope,$firebaseArray,$uibModal) {
    var self = this;

    var ref = firebase.database().ref("/paquetes");
    var list = $firebaseArray(ref);
    list.$loaded()
       .then(function(){
           $scope.paquetes = list
       });

    self.addPaquete = function(){
      $uibModal.open({
        templateUrl: 'views/app/modals/addPaquete.html',
        size: 'sm',
        controller: function($scope,$uibModalInstance) {
          $scope.newPaquete = {
            name:"El mejor paquete",
            description:"El mejor paquete de todos donde podrás",
            cupo : "1 - 10 personas",
            costo:50
          }

          $scope.ok = function(){
            firebase.database().ref("paquetes").push($scope.newPaquete)
            $uibModalInstance.close();
          }

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
        }
      });
    }
  }]);
