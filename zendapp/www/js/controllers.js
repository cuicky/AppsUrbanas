angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$rootScope) {
  console.log($rootScope);
  $rootScope.productosSeleccionados = [

  ]

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope,$firebaseArray,$firebaseObject) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
  // var ref = firebase.database().ref();
  // download the data into a local object
  var ref = firebase.database().ref().child("ventas");
 // download the data into a local object
 var syncObject = $firebaseArray(ref);
 syncObject.$loaded()
    .then(function(){
        angular.forEach(syncObject, function(user) {
            console.log(user);
        })
    });
 // console.log(syncObject);
  // putting a console.log here won't work, see below
  firebase.database().ref().child("ventas").push({
    "name":"romina"
  })

  firebase.auth().createUserWithEmailAndPassword("hola@jjj.com", "kjdkjdkjdkjd").catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
})

.controller('LoginCtrl', function($scope,$timeout,$rootScope,Auth,$state) {
  $scope.action="login"
  $scope.loading=null;

  $scope.toggleAction = function(){
    ($scope.action=="login")?$scope.action="register":$scope.action="login";
  }
  $scope.email = "";
  $scope.password = "";

  $scope.signUp = function(email,pass){
    $scope.loading=true;

    $scope.message = null;
      $scope.error = null;
      console.info(email,pass)

      // Create a new user
      Auth.$createUserWithEmailAndPassword(email,pass)
        .then(function(firebaseUser) {
          console.log(firebaseUser);
          $scope.loading=null;
          $rootScope.email = $scope.email;
          firebaseUser.sendEmailVerification();
          $state.go("app.playlists")
        }).catch(function(error) {
          console.error(error);
          $scope.loading=null;
          $scope.error=error;

        $timeout(function(){
          $scope.error=null;
        },3000)
        });
//     var ref = firebase.database().ref()
//     debugger
//
//     $rootScope.authObj = $firebaseAuth();
//
// var newUser = {
//   email: "email@email.com",
//   password: "password",
//   displayName: "Display Name",
//   favFood: "Food"
// };
//
// $rootScope.authObj.$createUser(newUser.email, newUser.password).then(function(authData) {
//   console.log(authData.uid); //should log new uid.
//   return createProfile(newUser, authData);
// });
//
//
// function createProfile(authData, user){
//   var profileRef = $firebase(ref.child('profile'));
//   return profileRef.$set(authData.uid, user);
// };
  }


  $scope.signIn = function(email,pass){
    $scope.loading=true;
    console.log(email,pass);
    Auth.$signInWithEmailAndPassword(email,pass).then(function(firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
      $scope.loading=null;
      $state.go("app.playlists")
    }).catch(function(error) {
      console.error(error)
      $scope.loading=null;
      if (error = 'INVALID_EMAIL') {
        $scope.error="Email invalido o no registrado";
      } else if (error = 'INVALID_PASSWORD') {
        $scope.error="Contraseña incorrecta";
      } else {
        $scope.error=error;
      }
      $timeout(function(){
        $scope.error=null;
      },3000)
    });
  }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('CheckoutCtrl', function($scope, $stateParams) {
})

.controller('TiendaCtrl', function($scope,$rootScope, $stateParams,$http) {
  var promise = $http({
    method:"GET",
    url:"http://www.zend.mx/wp-json/wp/v2/product"
  })

  promise.then(function(resp){
    $scope.productos = resp.data
    console.log($scope.productos)
  },function(error){
    console.error(error)
  })

  $scope.addProducto = function(p){
    p.cnt=1;
    $rootScope.productosSeleccionados.push(p)
    angular.element(document.getElementById("dataProduct")).removeClass("fadeIn").addClass("fadeIn")
  }
})

.controller('CuentaCtrl', function($scope, $stateParams,$ionicPopover) {
  // .fromTemplateUrl() method
  $scope.popover = $ionicPopover.fromTemplate('<ion-popover-view><div>hello, popover</div></ion-popover-view>');


  $scope.openPopover = function($event) {
    alert("kjkj")
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hidden popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
});
