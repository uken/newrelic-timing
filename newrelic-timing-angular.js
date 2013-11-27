;angular.module('newrelic-timing').run(['$rootScope', function($rootScope) {
  $rootScope.$on('$routeChangeStart', function() {
    window.newrelicTiming.mark('nav_start')
  })
  $rootScope.$on("$routeChangeSuccess", function() {
    window.newrelicTiming.mark('dom_loaded')
  })
  $rootScope.$on("$viewContentLoaded", function() {
    window.newrelicTiming.mark('page_rendered')
    window.newrelicTiming.sendNRBeacon()
  })
}]);
