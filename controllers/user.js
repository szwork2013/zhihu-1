var User = require('../proxy').User;
var Question = require('../proxy').Question;
var Answer = require('../proxy').Answer;
var tools = require('../common/tools');
var config = require('../config');
var mailer = require('../common/email');
var _ = require('lodash');
var sha1 = require('sha1');
var validator = require('validator');

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
                    res.redirect('/signup')
                }
            })
        })

    } else {
        res.redirect('/signup')
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
            return res.json({ code: 10006, msg: "用户不存在" })
        } else {
            if (user.active) {
                tools.bcompare(userLogin.password, user.password, function(err, isMatch) {
                    if (isMatch) {
                        if (userLogin.remberme) {
                            res.cookie('user_cookie', userLogin, { maxAge: 7 * 1000 * 60 * 60 * 24, httpOnly: true });
                        }
                        req.session.login = true;
                        req.session.user = user; //用户信息放入session中
                        res.json({ code: 10000, msg: "登录成功" });

                    } else {
                        return res.json({ code: 10001, msg: "密码不正确" })
                    }

                })
            } else {
                return res.json({ code: 10012, msg: "请先激活账号" })
            }
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
            req.session.active = true;
            req.session.redirectToActive = true;
            res.redirect('/active');
        }

    })
}

exports.register = function(req, res, next) {

    var user = {
        email: req.body.email,
        username: req.body.username,
        nickname: req.body.username,
        password: req.body.password,
        avatar: '5a0af4e6cf5d34d05315ae8e53274ac2_l.jpg', //默认图像
        accessToken: sha1(Date.parse(new Date()))
    };

    User.findByEmail(user.email, function(err, email) {
        if (err) {
            return next(err)
        }
        if (!email) {
            tools.bhash(user.password, function(err, _password) {
                if (err) {
                    console.log(err)
                    return next(err)
                };
                user.password = _password;
                User.saveUser(user, function(err, saveduser) {
                    if (err) {
                        console.log(err)
                        if (err.message.match('E11000 duplicate key')) {
                            res.json({ code: 10007, msg: '该用户名已经注册' });
                            return;
                        }
                        return next(err);
                    } else {
                        mailer.sendActiveMail(saveduser.email, saveduser.accessToken, saveduser._id, saveduser.username)
                        req.session.email = saveduser.email;
                        req.session.active = false;
                        req.session.redirectToActive = true;
                        res.json({ code: 10000, msg: "success", email: saveduser.email });
                    }

                })

            });

        } else {
            res.json({ code: 10004, msg: '该邮箱已经注册' });
            return;
        }
    })


}

/*获取用户激活界面查看是否激活*/
exports.getActivePage = function(req, res, next) {

    var redirectToActive = req.session.redirectToActive;
    if (redirectToActive) {
        var active = req.session.active == true ? true : false;
        var email = req.session.email;
        res.render('active', {
            active: active,
            email: email
        });
    } else {
        res.redirect('/')
    }

}

exports.askQuestion = function(req, res, next) {
    var question = {
        title: req.body.question_title,
        content: req.body.question_explain,
        author: req.session.user
    }
    Question.saveQuestion(question, function(err, _question) {
        if (err) return next(err);
        res.json({ code: 10000, question_id: _question._id });
    })
}

/*发现首页*/
exports.explore = function(req, res, next) {
    User.findRandomQuestion(function(err, recommend) {
        if (err) {
            return next(err);
        }
        res.render('explore', {
            recommend: recommend
        });

    });
}

exports.getHotQuestion = function(req, res, next) {
    var skip = parseInt(req.body.skip);
    User.getHotQuestion(skip, function(err, questions) {
        if (err) {
            return next(err)
        }
        res.json(questions);
    })
}

exports.getQuestionTopAnswer = function(req, res, next) {
    var question_id = req.body.question_id;
    User.getQuestionTopAnswer(question_id, function(err, answer) {
        if (err) {
            return next(err)
        }
        res.json(answer);

    });
}

exports.getHotAnswer = function(req, res, next) {
    var skip = parseInt(req.body.skip);
    User.getHotAnswer(skip, function(err, answers) {
        if (err) {
            return next(err)
        }
        res.json(answers);
    })
}



exports.getQuestionAndAnswerById = function(req, res, next) {
    var question_id = req.params.question_id;
    if (validator.isMongoId(question_id)) {
        User.getQuestionAndAnswerById(question_id, function(err, result) {
            if (err) {
                return next(err)
            }
            if (result.question) {
                res.render('question', {
                    question: result.question,
                    answers: result.answers
                })

            } else {
                return next(null);
            }

        });

    } else {
        return next(null);

    }



}


exports.submitAnswer = function(req, res, next) {

    var question_id = req.body.question_id;
    var answer_content = req.body.answer_content;
    var user = req.session.user;
    var answer = {
        content: answer_content,
        author: req.session.user,
        question: question_id
    }
    console.log(answer);
    Answer.createAnswer(answer, function(err, answer) {
        if (err) {
            return next(err)
        }
        res.json({ code: 10000, answer: answer });
    });

}


exports.logout = function(req, res, next) {
    req.session.active = null;
    req.session.email = null;
    redirectToActive = null;
    req.session.user = null;
    res.redirect('/explore');
}
