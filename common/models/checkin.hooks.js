module.exports = function(Checkin){

  /**
   * Before
   */



  /**
   * After
   */
  Checkin.afterRemote('create', function(ctx, model, next){
    Checkin.app.io.emit('checkin', model);
    next();
  });
};
