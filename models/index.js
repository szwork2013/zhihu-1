var mongoose = require('mongoose');
var config = require('../config'); //引入配置文件
var logger = require('../common/logger') //引入日志文件
mongoose.Promise = global.Promise;

mongoose.connect(config.db, {
    server: { poolSize: 20 }
}, function(err) {
    if (err) {
        logger.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

// models
require('./user');
require('./question');
require('./answer');

exports.User = mongoose.model('User');
exports.Question = mongoose.model('Question');
exports.Answer = mongoose.model('Answer');
