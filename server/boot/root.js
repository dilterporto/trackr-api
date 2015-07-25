module.exports = function(server) {

  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/status', server.loopback.status());

  //router.get('/', function(req, res, next){
  //
  //  res.render('index', { msg: 'Hello man!' });
  //
  //});


  server.use(router);
};
