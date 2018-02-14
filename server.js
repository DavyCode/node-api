const restify = require('restify'),
      server = restify.createServer();

var Users = {};
var max_user_id = 0;

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());






server.get('/', (req, res, next) => {
  res.setHeader('content-type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(Users));
  return next();
});



server.get('/user/:id', (req, res, next) => {
  res.setHeader('content-type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(Users[parseInt(req.params.id)]));
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


server.put('/user/:id', (req, res, next) => {
  var user = Users[parseInt(req.params.id)];
  var updates = req.params;

  for(var field in updates) {
    user[field] = updates[field]
  }

  res.setHeader('content-type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(user));
  return next();
})



server.del('/user/:id', (req, res, next) => {
  delete Users[parseInt(req.params.id)];

  res.setHeader('content-type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(true));
  return next();
});







server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});