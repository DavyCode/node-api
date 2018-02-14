var helpers = require('../config/helpers');

var Users = {};
var max_user_id = 0;


module.exports = function (server) {
  
  server.get('/', (req, res, next) => {
     helpers.success(res, next, Users);
  });

  server.get('/user/:id', (req, res, next) => {
    req.assert('id', 'Id is required and must be numeric').notEmpty().isInt();
    var errors = req.validationErrors();
    if(errors) {
      helpers.failure(res, next, errors[0], 400);
    }

    if(typeof(Users[req.params.id]) === 'undefined') {
      helpers.failure(res, next, 'The specified user could not be found', 404)
    }
     helpers.success(res, next, Users[parseInt(req.params.id)]);
  });



  server.post('/user', (req, res, next) => {
    req.assert('first_name', 'First name is required').notEmpty();
    req.assert('last_name', 'Last name is required').notEmpty();
    req.assert('email', 'Email is required and must be vaild').notEmpty().isEmail();
    req.assert('location', 'Country must be either abuja, lagos, or kaduna ').isIn(['abuja', 'lagos', 'kaduna']);

    var errors = req.validationErrors();
    if(errors) {
      helpers.failure(res, next, errors[0], 400);
      return false;
    }
    var user = req.params;
    max_user_id += 1;
    user.id = max_user_id;
    Users[user.id] = user;

    helpers.success(res, next, user)
  });


  server.put('/user/:id', (req, res, next) => {
    req.assert('id', 'Id is required and must be numeric').notEmpty().isInt();
    var errors = req.validationErrors();
    if(errors) {
      helpers.failure(res, next, errors[0], 400);
    }

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
    req.assert('id', 'Id is required and must be numeric').notEmpty().isInt();
    var errors = req.validationErrors();
    if(errors) {
      helpers.failure(res, next, errors[0], 400);
    }

    if(typeof(Users[req.params.id]) === 'undefined') {
      helpers.failure(res, next, 'The specified user could not be found', 404)
    }
    delete Users[parseInt(req.params.id)];

     helpers.success(res, next, [])
  });
    
}