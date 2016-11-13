var validator = require('validator');

exports.userInfo = function(req, res, next) {

    var _email = req.body.email;
    var _username = req.body.username;
    var _password = req.body.password;

    validator.isEmail(_email);

    if (!validator.isEmail(_email)) {

        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({ code: 10001, msg: '填写正确邮件格式' }, null, 4));
    }
    if (!validator.isByteLength(_username, { min: 6, max: 18 })) {
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({ code: 10001, msg: '用户名长度在6-18个字节之间' }, null, 4));
    }

    if (validator.isEmpty(_password)) {
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({ code: 10001, msg: '密码不能为空' }, null, 4));
    }
    next();
};
exports.login = function(req, res, next) {
    var user = req.session.user;
    //检查session中是否存在用户信息
    if (user) {
        next();
    } else {
        return res.json({ code: 10005, msg: '请登录' });
    }


}
