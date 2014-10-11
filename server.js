var express        = require('express');
var bootable       = require('bootable');

var log            = require('./setup/logger');
var config         = require('nconf');

var passport       = require('passport');

var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var expressSession = require('express-session');


var app = bootable(express());

app.phase(bootable.initializers('initializers/'));
app.phase(bootable.routes('routes/', app));

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ secret: config.get('express:session:secret') }));


app.use(passport.initialize());
app.use(passport.session());

app.boot(function (err) {
    if (err) throw err;

    var port = config.get('express:port');
    app.listen(port, function () {
        log.info('Listening on port %d'.cyan, this.address().port);
    });
});

