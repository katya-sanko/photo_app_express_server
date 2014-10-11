'use strict';

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose      = require('mongoose');


var User = mongoose.model('user');

module.exports = function () {

    passport.use(new LocalStrategy(
        function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user || !user.validPassword(password)) {
                return done(null, false, { message: 'Invalid username or password' });
            }
            else {
                return done(null, user, { message: 'Signed in successfully.' });
            }
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}

