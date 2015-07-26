module.exports = function(Track) {

  /**
   * Instance methods
   */
  Track.prototype.started = function(){
    return this.status === 'started';
  };

  Track.prototype.starts = function(){

    //if(this.started())
    //  throw new Error('track has already started', 400);

    this.status = 'started';
    this.startedAt = Date.now();
  };

  /**
   * Hooks
   */
  Track.afterRemote('start', function(context, model, next){

    Track.app.io.emit('trackStarted', model.track);

    next();

  });

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
