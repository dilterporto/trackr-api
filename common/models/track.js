module.exports = function(Track) {

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
