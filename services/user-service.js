var User = require('../models/user').User;
var bcrypt = require('bcrypt');
exports.addUser = function(user, next) {
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
   
    var newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      roomNumber: user.roomNumber,
      email: user.email.toLowerCase(),
      password: hash
    });
  
    newUser.save(function(err) {
      if (err) {
        return next(err);
      }
      next(null);
    });
})};

exports.findUser = function(email, next) {
  User.findOne({email: email.toLowerCase()}, function(err, user) {
    next(err, user);    
  });
};