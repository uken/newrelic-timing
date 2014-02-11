/*!
 * newrelic-timing v0.4.0 - Integrates Single Page Apps with NewRelic's Real User Monitoring
 * Copyright (c) 2014 Diogo Terror <diogo@uken.com>, pitr <pitr.vern@gmail.com> - https://github.com/uken/newrelic-timing
 * License: MIT
 */

(function(angular, NewrelicTiming) {
  if (typeof angular === 'undefined' || angular === null || typeof angular.module !== 'function') {
    return;
  }

  var module = angular.module('newrelic-timing', []);

  if (typeof module.run !== 'function') {
    return;
  }

  module.run(['$rootScope', '$location', function($rootScope, $location) {
    var newrelicTiming = new NewrelicTiming();

    function changeStart(){
      newrelicTiming.mark('navStart');
    }
    function changeSuccess() {
      newrelicTiming.mark('domLoaded');
    }

    // ngRoute
    $rootScope.$on('$routeChangeStart', changeStart);
    $rootScope.$on('$routeChangeSuccess', changeSuccess);

    // ui-router
    $rootScope.$on('$stateChangeStart', changeStart);
    $rootScope.$on('$stateChangeSuccess', changeSuccess);

    $rootScope.$on('$viewContentLoaded', function() {
      newrelicTiming.mark('pageRendered');
      newrelicTiming.sendNRBeacon($location.path());
    });
  }]);

})(window.angular, window.NewrelicTiming);