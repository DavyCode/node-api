const restify = require('restify'),
      server = restify.createServer();

var setupController = require('./controllers/setupController')
var userController = require('./controllers/user')


setupController(server, restify);
userController(server);


server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});