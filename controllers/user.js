var helpers = require('../config/helpers');
var Users = require('../models/user');

var max_user_id = 0;


module.exports = function (server) {
  
  server.get('/', (req, res, next) => {
    Users.find({}, (err, users) => {
      helpers.success(res, next, users);
    }) 
  });

  server.get('/user/:id', (req, res, next) => {
    req.assert('id', 'Id is required and must be numeric').notEmpty();
    var errors = req.validationErrors();
    if(errors) {
      helpers.failure(res, next, errors[0], 400);
    }

    Users.findOne({_id : req.params.id}, (err, user) => {
      if(!user){
        helpers.failure(res, next, "The specified user wasn't found", 404);
      }
      if(err){
        helpers.failure(res, next, "Error fetching user from database", 500);
      }
      helpers.success(res, next, user);
    })

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

    var user = new Users();
    user.first_name = req.params.first_name;
    user.last_name = req.params.last_name;
    user.email = req.params.email;
    user.location = req.params.location;

    user.save((err) => {
      if(err){
      helpers.failure(res, next, errors, 500);
      }
      helpers.success(res, next, user);
    });
 
  });


  server.put('/user/:id', (req, res, next) => {
    req.assert('id', 'Id is required and must be numeric').notEmpty();
    var errors = req.validationErrors();
    if(errors) {
      helpers.failure(res, next, errors[0], 400);
    }

    Users.findOne({_id : req.params.id}, (err, user) => {
      if(!user){
        helpers.failure(res, next, "The specified user wasn't found", 404);
      }
      if(err){
        helpers.failure(res, next, "Error fetching user from database", 500);
      }

      var updates = req.params;
      
      for(var field in updates) {
        user[field] = updates[field];
      }
      user.save((err) => {
        if(err){
            helpers.failure(res, next, 'Failed to update user data', 500);
        }
            helpers.success(res, next, user);
      });
    });
  });




  server.del('/user/:id', (req, res, next) => {
    req.assert('id', 'Id is required and must be numeric').notEmpty();
    var errors = req.validationErrors();
    if(errors) {
      helpers.failure(res, next, errors[0], 400);
    }

    Users.findOne({_id : req.params.id}, (err, user) => {
      if(!user){
        helpers.failure(res, next, "The specified user wasn't found", 404);
      }
      if(err){
        helpers.failure(res, next, "Error fetching user from database", 500);
      }

      user.remove((err) => {
        if(err){
            helpers.failure(res, next, 'Error deleting user data', 500);
        }
            helpers.success(res, next, user);
      });
    })
  });
    
}