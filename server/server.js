'use strict';
var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
app.use(function(req, res, next) {
  if(req.url.indexOf("/api/") >=0) {
    if(req.query.access_token) {
      var token = req.query.access_token;
      var date = new Date().getTime();
      app.models.accessToken.find({
        where: { id: token}
      },function(err, value) {
          if (err) {
              return next(err);
          } else {
            var get = value[0].created.getTime();
            var time = value[0].ttl;
            if (date - get < 1000 * 60 * 60 * 24){
              return next();
            } else{
              console.log('invalid token');
              return next('unauthentication');
            }

          }
      });
    } else {
        var href = req.url;
        var str = href.substr(href.lastIndexOf('/') + 1);
        if ( str.indexOf('signUp') >= 0) {
           return next();
        } else if (str.indexOf('signin') >= 0) {
           return next();
        } else {
          return next('unauthentication');
        }
    }
  } else {
    return next();
  }
});
app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
