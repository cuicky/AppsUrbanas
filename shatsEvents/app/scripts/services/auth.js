'use strict';

/**
 * @ngdoc service
 * @name appSha.auth
 * @description
 * # auth
 * Factory in the appSha.
 */
angular.module('appSha')

.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://shatsev-22bd1.firebaseio.com");
    return $firebaseAuth(ref);
  }
])
