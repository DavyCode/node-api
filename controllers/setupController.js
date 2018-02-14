var helpers = require('../config/helpers');

module.exports = function(server, restify, restifyValidator) {

  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());
  server.use(restifyValidator);
 
  server.use(restify.plugins.authorizationParser());

  server.use((req, res, next) => {
      
      var apiKeys = {
     //username:  password
        'user1': 'jdueoabjieonwfduc8374msgw93'
      };


      if(typeof(req.authorization.basic) ==='undefined' || !apiKeys[req.authorization.basic.usename] || req.authorization.password !== apiKeys[req.authorization.basic.username]){
         return helpers.failure(res, next, "Must specify a valid API key", 403)
        // var response = {
        //   'status': 'failure',
        //   'data':  "Must specify a valid API key"
        // };  
        // res.setHeader('content-type', 'application/json');
        // res.writeHead(403);
        // res.end(JSON.stringify(response));
        // return next();
      }

      return next();
  });
}