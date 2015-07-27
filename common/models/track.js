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

  require('./track.hooks')(Track);
  require('./track.remote')(Track);

};
