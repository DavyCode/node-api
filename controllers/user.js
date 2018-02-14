var helpers = require('../config/helpers')

var Users = {};
var max_user_id = 0;


module.exports = function (server) {
  
  server.get('/', (req, res, next) => {
     helpers.success(res, next, Users);
  });

  server.get('/user/:id', (req, res, next) => {
    if(typeof(Users[req.params.id]) === 'undefined') {
      helpers.failure(res, next, 'The specified user could not be found', 404)
    }
     helpers.success(res, next, Users[parseInt(req.params.id)]);
  });


  server.post('/user', (req, res, next) => {
    var user = req.params;
    max_user_id += 1;
    user.id = max_user_id;
    Users[user.id] = user;

     helpers.success(res, next, user)
  });


  server.put('/user/:id', (req, res, next) => {
    if(typeof(Users[req.params.id]) === 'undefined') {
      helpers.failure(res, next, 'The specified user could not be found', 404)
    }

    var user = Users[parseInt(req.params.id)];
    var updates = req.params;
    for(var field in updates) {
      user[field] = updates[field]
    }


     helpers.success(res, next, user);
  });

  server.del('/user/:id', (req, res, next) => {
    if(typeof(Users[req.params.id]) === 'undefined') {
      helpers.failure(res, next, 'The specified user could not be found', 404)
    }
    delete Users[parseInt(req.params.id)];

     helpers.success(res, next, [])
  });
    
}