var app = angular.module('app',
[
  'app.services',
  'ngRoute',
  'btford.socket-io'
]);

app.factory('SocketApi', function (socketFactory) {
  return socketFactory();
});

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/dashboard.html'
    })
    .when('/routes', {
      templateUrl: 'templates/routes.html',
      controller: 'RouteController'
    });
})
.factory('Humanize', function(){

  return Humanize;
})
.controller('MainController', function($scope, Humanize, Track, Checkin, SocketApi){

  $scope.pluralize = function(val, term){
    return Humanize.pluralize(val, term);
  };

  var onGetStartedTracks = function(started){

    started.forEach(function(track){
      track.completed = track.checkins.length / track.route.points.length;
    });

    $scope.tracksStarted = started;
  };

  var onGetAllCheckins = function(checkins){
    $scope.checkins = checkins;
  };

  Track.find({
    filter:{
      where: {
        status:'started'
      },
      include:[
        'checkins',
        { route:['points'] }
      ]
    }
  }, onGetStartedTracks);

  Checkin.find({
    filter:{

    }
  }, onGetAllCheckins);

  SocketApi.on('trackStarted', function(track){
    $scope.tracksStarted.push(track);
  });

})
.controller('DashboardController', function($scope){


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
