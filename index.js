var Path = require('path');
var Hapi = require('hapi');

var server = new Hapi.Server();

function isLoggedIn() {
  return false;
}

server.connection({port: 3000});
server.register([
  require('vision'),
  require('inert'),
  require('h2o2')], function(error) {
    if (error) {
      console.log('Plugin load failed: ' + error);
    }

    server.views({
      engines: {
        html: require('handlebars')
      },
      path: Path.join(__dirname, './backend/views')
    });

    server.route({
      method: 'GET',
      path: '/login',
      handler: function(request, reply) {
        if (isLoggedIn(request)) {
          reply.redirect('/');
        } else {
          var viewOpts =  {};
          reply.view('login', viewOpts);
        }
      }
    });
});

server.start(function() {
  console.log('Server started at', server.info.uri);
});
