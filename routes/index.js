var passport = require('passport');

var pickClientSideUserData = function(user) {
	var safeUser = {};
	var allowedKeys = ['id', 'username', 'photos'];

	for (var key in user) {
		if (allowedKeys.indexOf(key) >= 0) {
			safeUser[key] = user[key];
		}
	}

	return safeUser;
}

var mustBeAuthenticated = function(req, res, next) {
	req.isAuthenticated() ? next() : res.send(403, 'Forbidden');
}

// GET
var testApi = function(req, res) {
  res.json({ message: "Api is working" });
}

var greetings = function(req, res) {
  return res.send("gentleman");
}

// POST
var login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
    	res.json({ status: 403, message: "Login fault."});
    }
    if (!user) {
    	res.json({ status: 403, message: "Invalid user or password."});
    }
    req.logIn(user, function(err) {
      if (err) {
      	res.json({ status: 403, message: "Error while log in."});
      }
      return res.json({ status: 200, data: pickClientSideUserData(user) });
    });
  })(req, res, next);
};

module.exports = function () {
  this.post('/api/login', login);

  this.get('/api/test', testApi);

  this.get('/api/greetings', greetings);
}
