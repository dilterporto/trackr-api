module.exports = function(Track) {


  /**
   * Hooks
   */
    Track.afterRemote('create', function(context, model, next){

      Track.app.io.emit('trackCreated', model);

      next();

    });

    /**
    * Start a track
    * @param {String} trackId The track will starts
    * @returns {Object} The normalized credential object
    */
    Track.start = function(trackId, cb){

        console.log(trackId);

        var onFindTrack = function(err, track){

            if(err)
                cb(err);

            track.status = 'started';
            track.startedAt = Date.now();

            track.save(function(err, obj){
               cb(err, obj);
            });
        };

        Track.findById(trackId, onFindTrack);

    };

    Track.remoteMethod('start', {

        accepts: [
            { arg: 'trackId', type: 'string', http:{ source: 'path' }}
        ],
        returns: {
            type: 'object'
        },
        http: {
            path: '/start/:trackId',
            verb: 'put'
        }
    });
};
