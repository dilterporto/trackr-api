/**
 * Created by dilter on 7/27/15.
 */
(function(angular, Humanize){

  angular.module('app.services', [
      'btford.socket-io'
    ])
    .factory('SocketApi', function (socketFactory) {
      return socketFactory();
    })
    .factory('Humanize', function(){
      return Humanize;
    });

})(angular, Humanize);

