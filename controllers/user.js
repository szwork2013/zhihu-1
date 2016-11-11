var User = require('../proxy').User; //proxy user里面完成具体的业务
var tools = require('../common/tools');
var config = require('../config');
var mailer = require('../common/email');
var _ = require('lodash');
var sha1 = require('sha1');





exports.activeUser = function (req,res,next) {
    var accessToken = req.query.accessToken;
    var _id = req.query._id;
    User.activeUserById(_id,accessToken,function (err,user) {
        if(err) {
            res.render('error',{
                message:"用户激活失败"
            })
        }else{
            req.session.user = user;//用户的值放入session当中
            res.render('explore');
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
                }
                return next(err);
            } else {
                var _accessToken = sha1(saveduser._id);
                User.updateUserByID(saveduser._id, { accessToken: _accessToken }, function(err, updateUser) {
                    if (err) return next(err);
                    mailer.sendActiveMail(saveduser.email, _accessToken, saveduser._id, saveduser.username)
                    res.render('active', {
                        email: saveduser.email
                    });

                });


            }

        })

    });

}
