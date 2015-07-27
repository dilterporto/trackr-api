module.exports = function(Track){

  /**
   * Before
   */



  /**
   * After
   */
  Track.afterRemote('start', function(ctx, model, next){

    var onFindTrackById = function(err, track){
      Track.app.io.emit('trackStarted', track);
      next();
    };

    Track.findOne({
      where: {
        id: model.track.id
      },
      include: [
        {
          route: ['points']
        },
        'checkins'
      ]
    }, onFindTrackById);
  });

};
