/**
 * Created by dilter on 7/25/15.
 */

var app = angular.module('app', [ 'lbServices', 'ngRoute', 'btford.socket-io']);

app.factory('SocketApi', function (socketFactory) {
  return socketFactory();
});

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardController'
      })
      .when('/routes', {
        templateUrl: 'templates/routes.html',
        controller: 'RouteController'
      });
  })
  .controller('MainController', function(SocketApi){

    SocketApi.on('statusChecked', function(){

      alert('status was Checked');

    });

  })
  .controller('DashboardController', function(){


  })
  .controller('RouteController', function($scope, Route){

    Route
      .find({ filter: {include: 'points'} })
      .$promise
      .then(function(results) {

        $scope.routes = results;


        console.log(results);
      });

  });
