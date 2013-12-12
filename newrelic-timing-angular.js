;angular.module('newrelic-timing').run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeStart', function() {
    window.newrelicTiming.mark('nav_start')
  })
  $rootScope.$on("$routeChangeSuccess", function() {
    window.newrelicTiming.mark('dom_loaded')
  })
  $rootScope.$on("$viewContentLoaded", function() {
    window.newrelicTiming.mark('page_rendered')
    window.newrelicTiming.sendNRBeacon($location.path())
  })
}]);
