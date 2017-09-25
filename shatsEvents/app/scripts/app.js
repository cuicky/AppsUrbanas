'use strict';

/**
 * @ngdoc overview
 * @name appSha
 * @description
 * # appSha
 *
 * Main module of the application.
 */
angular
  .module('appSha', [
    'firebase',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'LocalStorageModule',
    'textAngular'
  ])
  .config(function ($stateProvider,$urlRouterProvider,localStorageServiceProvider) {



    localStorageServiceProvider
    .setPrefix('shatsevents');

    $urlRouterProvider.otherwise('/');


    $stateProvider.state('login', {
        url:"/",
        views   : {
            '' : {
                templateUrl: 'views/login/login.html',
                controller : 'LoginCtrl as vm'
            }
        },
        data: {pageTitle: 'Login'}
    })

    $stateProvider.state('nuevos', {
        url:"/nuevos",
        views   : {
            '' : {
                templateUrl: 'views/login/nuevos.html',
                controller : 'NuevosCtrl as vm'
            }
        },
        data: {pageTitle: 'Login'}
    })

    .state('app', {
        url:"/app",
        abstract:true,
        views   : {
            '' : {
                templateUrl: 'views/app/layout.html',
                controller : 'AppCtrl as vm'
            }
        },
        data: {pageTitle: 'Login'}
    })
    .state('app.pagos', {
        url:"/pagos",
        views   : {
            '' : {
                templateUrl: 'views/app/pagos.html',
                controller : 'PagosCtrl as vm'
            }
        },
        data: {pageTitle: 'Login'}
    })
    .state('app.paquetes', {
        url:"/paquetes",
        views   : {
            '' : {
                templateUrl: 'views/app/paquetes.html',
                controller : 'PaquetesCtrl as vm'
            }
        },
        data: {pageTitle: 'Login'}
    })
    .state('app.eventos', {
        url:"/eventos",
        views   : {
            '' : {
                templateUrl: 'views/app/eventos.html',
                controller : 'EventosCtrl as vm'
            }
        },
        data: {pageTitle: 'Login'}
    })
    .state('app.clientes', {
        url:"/clientes",
        views   : {
            '' : {
                templateUrl: 'views/app/clientes.html',
                controller : 'ClientesCtrl as vm'
            }
        },
        data: {pageTitle: 'Login'}
    });
  })
  .run(function() {
  });
