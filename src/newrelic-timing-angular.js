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

    $rootScope.$on('$routeChangeStart', function() {
      newrelicTiming.mark('navStart');
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      newrelicTiming.mark('domLoaded');
    });
    $rootScope.$on('$viewContentLoaded', function() {
      newrelicTiming.mark('pageRendered');
      newrelicTiming.sendNRBeacon($location.path());
    });
  }]);

})(window.angular, window.NewrelicTiming);
