function respond(res, next, status, data, http_code) {
  var response = {
    'status': status,
    'data': data
  };

  res.setHeader('content-type', 'application/json');
  res.writeHead(http_code);
  res.end(JSON.stringify(response));
  return next();
};

function success(res, next, data) {
  respond(res, next, 'success', data, 200)
};

function failure(res, next, data, http_code) {
  respond(res, next, 'failure', data, http_code)
};



const restify = require('restify'),
      server = restify.createServer();

var Users = {};
var max_user_id = 0;

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());






server.get('/', (req, res, next) => {
  success(res, next, Users);
});

server.get('/user/:id', (req, res, next) => {
  success(res, next, Users[parseInt(req.params.id)]);
});


server.post('/user', (req, res, next) => {
  var user = req.params;
  max_user_id += 1;
  user.id = max_user_id;
  Users[user.id] = user;

  success(res, next, user)
});


server.put('/user/:id', (req, res, next) => {
  var user = Users[parseInt(req.params.id)];
  var updates = req.params;

  for(var field in updates) {
    user[field] = updates[field]
  }

  success(res, next, user);
});

server.del('/user/:id', (req, res, next) => {
  delete Users[parseInt(req.params.id)];

  success(res, next, [])
});





server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});