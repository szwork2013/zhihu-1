var config = require('../config');

var env = process.env.NODE_ENV || "development"
var log4js = require('log4js');


log4js.configure({
    appenders: [
        { type: 'console' }, {
            type: 'file',
            filename: 'logs/zhihu.log',
            maxLogSize: 1024,
            backups: 4,
            category: 'normal'
        }
    ],
    replaceConsole: true
});

var level = config.debug && env !== 'test' ? 'INFO' : 'DEBUG';

exports.logger = function(name) {
    var logger = log4js.getLogger(name);
    logger.setLevel(level);
    return logger;
}
