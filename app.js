var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session'); // session依赖cookie模块
var mongoStore = require('connect-mongo')(session); // 对session进行持久化

var index = require('./routes/index');
var users = require('./routes/users');
//连接mongodb数据库
mongoose.connect('mongodb://localhost/zhihu');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 将ejs模板引擎修改成htm后缀
app.set('view engine', 'html');
app.engine('.htm', require('ejs').__express);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser('zhihu'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'zhihu', // 设置的secret字符串，来计算hash值并放在cookie中
    resave: false, // session变化才进行存储
    saveUninitialized: true,
    // 使用mongo对session进行持久化，将session存储进数据库中
    store: new mongoStore({
        url: 'mongodb://localhost/zhihu', // 本地数据库地址
        collection: 'sessions' // 存储到mongodb中的字段名
    })
}));


app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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