'use strict';

var log         = require('../setup/logger');
var config      = require('nconf');

var requireTree = require('require-tree');

var mongoose    = require('mongoose');
var models      = requireTree('../models/');


module.exports = function (done) {

    mongoose.connection.on('open', function () {
        log.info('Connected to mongoDB server!'.green);
        return done();
    });

    mongoose.connection.on('error', function (err) {
        log.error(err.message);
        return done(err);
    });


    var serverAddress = config.get('mongo:server');

    try {
        mongoose.connect(serverAddress);
        log.info('Opened connection to mongoDB on ' + serverAddress.cyan);
    } catch(err) {
        log.error('Connection to mongoDB on ' + serverAddress, err.message);
        return done(err);
    }
}

