var validator = require('validator');

exports.userInfo = function(req, res, next) {

    var _email = req.body.email;
    var _username = req.body.username;
    var _password = req.body.password;


    if (!validator.isEmail(_email)) {

        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({ code: 10002, msg: '填写正确邮件格式' }, null, 4));
    }
    if (!validator.isByteLength(_username, { min: 6, max: 18 })) {
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({ code: 10003, msg: '用户名长度在6-18个字节之间' }, null, 4));
    }

    if (validator.isEmpty(_password)) {
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({ code: 10005, msg: '密码不能为空' }, null, 4));
    }
    next();
};
exports.login = function(req, res, next) {
    var login = req.session.login;
    //检查session中是否存在用户信息
    if (login) {
        return res.json({ code: 10000, msg: '已经登录' });
    } else {
        return res.json({ code: 10008, msg: '请登录' });
    }
    next();
}

exports.answer = function(req, res, next) {
    var question_id = req.body.question_id;
    var answer_content = req.body.answer_content;
    console.log(answer_content);
    if (!validator.isMongoId(question_id)) {
        res.json({ code: 10010, msg: '请求数据错误' });
        return;
    }
    if (!validator.isByteLength(answer_content, { min: 20 })) {
        res.json({ code: 10011, msg: '回答内容不能少于十个汉字' });
        return;
    }
    next();
}

exports.loginInfo = function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    if (!validator.isEmail(email)) {
        res.json({ code: 10002, msg: '请填写正确邮件格式' })
        return;
    }
    if (validator.isEmpty(password)) {
        res.json({ code: 10005, msg: '密码不能为空' });
        return;
    }

    next();
}

exports.questionInfo = function(req, res, next) {
    var title = req.body.question_title;
    if (validator.isEmpty(title)) {
        res.json({ code: 10005, msg: '标题不能为空' });
        return;
    }
    next();
}
