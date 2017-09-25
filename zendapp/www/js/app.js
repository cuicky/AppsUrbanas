// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngAvatar','ionic.contrib.drawer','firebase','starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    setTimeout(function() {
        navigator.splashscreen.hide();
        $cordovaSplashscreen.hide();
    }, 300);
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
])

// .factory("todo",function($firebaseArray){
//   var ref = new Firebase("https://shatsevents.firebaseio.com/shatsevents")
//   return $firebaseArray(ref);
// })

.config(function($stateProvider, $urlRouterProvider) {
  var config = {
    apiKey: "AIzaSyAzVJH0fnoFdl_Mix3u6lQ_kKgG7OjiRxg",
    authDomain: "zend-295cf.firebaseapp.com",
    databaseURL: "https://zend-295cf.firebaseio.com",
    projectId: "zend-295cf",
    storageBucket: "",
    messagingSenderId: "796364620602"
  };
  firebase.initializeApp(config);
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('login', {
  url: '/login',
  templateUrl: 'templates/login.html',
  controller: 'LoginCtrl'
})

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.cuenta', {
      url: '/cuenta',
      views: {
        'menuContent': {
          templateUrl: 'templates/cuenta.html',
          controller: 'CuentaCtrl'
        }
      }
    })
    .state('app.tienda', {
      url: '/tienda',
      views: {
        'menuContent': {
          templateUrl: 'templates/tienda.html',
          controller: 'TiendaCtrl'
        }
      }
    })

    .state('app.checkout', {
      url: '/checkout',
      views: {
        'menuContent': {
          templateUrl: 'templates/checkout.html',
          controller: 'CheckoutCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
