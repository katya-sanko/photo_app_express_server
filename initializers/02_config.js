'use strict';

var config = require('nconf');

var rootPath = require('app-root-path');

config.add('file', { type: 'file', file: rootPath + '/config.json' });

// DO NOT put secrets.json under version control
config.add('secrets', { type: 'file', file: rootPath + '/secrets.json' });

