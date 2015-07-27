/**
 * Created by dilter on 7/27/15.
 */
(function(angular){

  angular.module('app.controllers', [

      'app.services',
      'app.api',
      'toaster',
      'ngAnimate'

    ])
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
        $scope.notify('info', 'Início de Track', 'Track ' + track.title + ' iniciada');
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

})(angular);
