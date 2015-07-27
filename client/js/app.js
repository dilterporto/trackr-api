var app = angular.module('app',
[
  'app.services',
  'toaster',
  'ngRoute',
  'ngAnimate',
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
.controller('MainController', function($scope, toaster, Humanize, Track, Checkin, SocketApi){

  $scope.pluralize = function(val, term){
    return Humanize.pluralize(val, term);
  };

  $scope.notify = function (type, title, text) {
    toaster.pop(type, title, text);
  };

  var calculateTrackCompleted = function(track){
    track.completed = track.checkins.length / track.route.points.length;
    return track;
  };

  var onGetStartedTracks = function(started){
    $scope.tracksStarted = started.map(calculateTrackCompleted);
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
    $scope.notify('success', 'Início de Track', 'Track ' + track.title + ' iniciada');
    $scope.tracksStarted.push(calculateTrackCompleted(track));
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
    });

});
