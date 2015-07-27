/**
 * Created by dilter on 7/27/15.
 */
module.exports = function(Track){

  /**
   * Remote methods
   */
  Track.start = function(trackId, cb){

    var onFindTrack = function(err, track){

      if(err)
        cb(err);

      try {

        track.starts();

        track.save(function(err, obj){
          cb(err, obj);
        });

      }
      catch (ex){
        cb(ex);
      }
    };

    Track.findById(trackId, onFindTrack);
  };
  Track.remoteMethod('start', {
    accepts: [
      { arg: 'trackId', type: 'string', http:{ source: 'path' }}
    ],
    returns: {
      arg: 'track', type: 'object'
    },
    http: {
      path: '/:trackId/start',
      verb: 'put'
    }
  });
};
