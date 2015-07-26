module.exports = function(Route) {
  Route.greet = function(msg, cb) {

    this.app.io.emit('statusChecked');


    cb(null, 'Greetings... ' + msg);
  };

  Route.remoteMethod(
    'greet',
    {
      accepts: {arg: 'msg', type: 'string'},
      returns: {arg: 'greeting', type: 'string'}
    }
  );
};
