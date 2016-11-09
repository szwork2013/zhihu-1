var express = require('express');
var bcrypt = require('bcrypt-nodejs'); //加载加密模块
var router = express.Router();
var ModelUser = require('../models/user');


router.get('/explore',function (req,res,next) {
    res.render('explore');
});

router.get('/question',function (req,res,next) {
    res.render('question');
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/login', function(req, res, next) {
    res.render('index');
});

router.post('/login', function(req, res, next) {

    var _email = req.body.email;
    var _password = req.body.password;
    ModelUser.findOne({ email: _email }, function(err, user) {
        if (err) console.log(err);
        if (user) {
            user.comparePassword(_password, function(err, isMatch) {
                if (err) { console.log(err) };
                if (isMatch) {
                    res.redirect('/explore');
                } else {
                    res.send({ result: false, msg: "password was wrong" });
                }
            });
        } else {
            res.send({ result: false, msg: "user no exist" });
        }

    })
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', function(req, res, next) {


    var resJson = {
        result: false,
        msg: ''
    };

    var _email = req.body.email;
    //查询目前是否存在此用户
    ModelUser.findOne({ "email": _email }, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            if (data) {
                resJson.msg = 'user has exist';
                res.send(resJson);
            } else {
                var _password = req.body.password;

                //对用户密码进行加密存储
                bcrypt.hash(_password, null, null, function(err, hash) {

                    if (err) {
                        resJson.msg = 'bcrypt password was wrong';
                        res.send(resJson);
                    } else {
                        var user = {
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        }

                        ModelUser.create(user, function(error, doc) {
                            if (error) {
                                console.log(error);
                            } else {
                                req.session.user = doc;
                                res.send(doc);
                            }
                        });

                    }
                });
            }
        }

    });
});

module.exports = router;
