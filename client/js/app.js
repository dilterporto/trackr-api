(function(angular){

  var app = angular.module('app',
  [
    'app.api',
    'app.services',
    'app.controllers',
    'ngRoute'
  ]);

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/dashboard.html'
      })
      .when('/routes', {
        templateUrl: 'templates/routes.html',
        controller: 'RouteController'
      });
  });

})(angular);
