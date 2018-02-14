const restify = require('restify'),
      server = restify.createServer();

var Users = {};
var max_user_id = 0;

server.use(restify.plugins.acceptParser(server.acceptable));
// server.use(restify.acceptParser(server.acceptable));
server.use(restify.plugins.bodyParser());

server.get('/', (req, res, next) => {
  res.setHeader('content-type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(Users));
  return next();
});



server.post('/user', (req, res, next) => {
  var user = req.params;
  max_user_id += 1;
  user.id = max_user_id;
  Users[user.id] = user;

  res.setHeader('content-type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(user));
  return next();
})





server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});