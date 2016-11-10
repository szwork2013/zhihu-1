var config = require('../config');

var env = process.env.NODE_ENV || "development"
var log4js = require('log4js');

log4js.configure({
    appenders: [
        { type: 'console' }, {
            type: 'file',
            filename: 'logs/zhihu.log',
            "maxLogSize": 20480,
            "backups": 3,
            category: 'cheese'
        }
    ],
    replaceConsole: true
});

var logger = log4js.getLogger('cheese');
var logger_level = config.debug && env !== 'test' ? 'DEBUG' : 'ERROR';
logger.setLevel(logger_level);


exports.logger = logger;  
  
exports.use = function(app) {   
    app.use(log4js.connectLogger(logger, {level:logger_level, format:':method :url'}));  
}
