var User = require('../proxy').User; //proxy user里面完成具体的业务
var tools = require('../common/tools');
var config = require('../config');
var mailer = require('../common/email');
var _ = require('lodash');
var sha1 = require('sha1');

exports.checkCookie = function(req, res, next) {
    var user = req.cookies.user_cookie;
    if (user) {
        User.findByEmail(user.email, function(err, _user) {
            tools.bcompare(user.password, _user.password, function(err, isMatch) {
                if (isMatch) {
                    req.session.user = _user;
                    res.render('explore');
                } else {
                    res.clearCookie('user_cookie'); //清除cookie
                    res.redirect('/login')
                }
            })
        })

    } else {
        res.redirect('/login')
    }


}


exports.login = function(req, res, next) {
    var userLogin = {
        email: req.body.email,
        password: req.body.password,
        remberme: req.body.remberme
    }

    User.findByEmail(userLogin.email, function(err, user) {
        if (!user) {
            return res.json({ code: 10004, msg: "用户不存在" })
        } else {
            tools.bcompare(userLogin.password, user.password, function(err, isMatch) {
                if (isMatch) {
                    if (userLogin.remberme) {
                        res.cookie('user_cookie', userLogin, { maxAge: 7 * 1000 * 60 * 60 * 24, httpOnly: true });
                    }
                    req.session.user = user; //用户信息放入session中
                    res.json({ code: 10000, msg: "登录成功" })

                } else {
                    return res.json({ code: 10003, msg: "密码不正确" })
                }

            })
        }
    });
}


exports.activeUser = function(req, res, next) {
    var accessToken = req.query.accessToken;
    var _id = req.query._id;
    User.activeUserById(_id, accessToken, function(err, user) {
        if (err) {
            res.render('error', {
                message: "用户激活失败"
            })
        } else {
            req.session.user = user; //用户的值放入session当中
            res.render('active', {
                active: true
            });
        }

    })
}

exports.register = function(req, res, next) {

    var user = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };
    tools.bhash(user.password, function(err, _password) {
        if (err) return next(err);
        user.password = _password;
        User.saveUser(user, function(err, saveduser) {
            if (err) {
                if (err.message.match('E11000 duplicate key')) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({ code: 10001, msg: '该邮件已经注册' }, null, 4));
                    return;
                }
                return next(err);
            } else {
                var _accessToken = sha1(saveduser._id);
                User.updateUserByID(saveduser._id, { accessToken: _accessToken }, function(err, updateUser) {
                    if (err) return next(err);
                    mailer.sendActiveMail(saveduser.email, _accessToken, saveduser._id, saveduser.username)
                    res.render('active', {
                        email: saveduser.email,
                        active: false
                    });
                    return;

                });


            }

        })

    });

}
