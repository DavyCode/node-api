const restify = require('restify'),
      server = restify.createServer();

var setupController = require('./controllers/setupController');
var userController = require('./controllers/user');
var restifyValidator = require('restify-validator');
var mongoose = require('mongoose');
var keys = require('./config/keys')


//DATABASE CONNECTION
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoConnection,(err) => {
  (err) ? console.error(err, 'Error Connecting to Database!'): console.log('DB Connected. Build Something Awesome!');
  });


setupController(server, restify, restifyValidator);
userController(server);





server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});