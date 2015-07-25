var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var loopback = require('loopback');
var boot = require('loopback-boot');
var engine = require('ejs-locals');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  console.log(app.express);


  app.set('views',  rootPath + '/client/views');
  app.engine('ejs', engine);
  app.set('view engine', 'ejs');

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
