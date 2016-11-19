var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session'); // session依赖cookie模块
var mongoStore = require('connect-mongo')(session); // 对session进行持久化
var fileUpload = require('express-fileupload');
var log4js = require('log4js');
var routes = require('./routes/index');
var config = require('./config');
var logger = require('./common/logger').logger('normal');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(log4js.connectLogger(logger,{ format:':method :url :status'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser(config.session_secret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name: "sessionID",
    secret: config.session_secret, // 设置的secret字符串，来计算hash值并放在cookie中
    resave: false, // session变化才进行存储
    saveUninitialized: true,
    // 使用mongo对session进行持久化，将session存储进数据库中
    store: new mongoStore({
        url: config.db, // 本地数据库地址
        collection: 'sessions' // 存储到mongodb中的字段名
    })
}));
app.use(fileUpload()); //文件上传
app.use(function(req, res, next) {
    var user = req.session.user;
    if (user) {
        app.locals.user = user;
        app.locals.login = true;
    } else {
        app.locals.login = false;
    }
    next();
});
//路由配置
app.use('/', routes);

app.use(function(req, res, next) {
    res.render('404')
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
