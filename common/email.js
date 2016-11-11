var mailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../config');
var util = require('util');
var logger = require('./logger').logger;
var transporter = mailer.createTransport(smtpTransport(config.mail_opts));
var SITE_ROOT_URL = 'http://127.0.0.1:3000';

/**
 * Send an email
 * @param {Object} data 邮件对象
 */
var sendMail = function(data) {
    /*  if (config.debug) {
        return;
      }*/
    // 遍历邮件数组，发送每一封邮件，如果有发送失败的，就再压入数组，同时触发mailEvent事件
    transporter.sendMail(data, function(err) {
        if (err) {
            logger.error(err);
        }
    });
};
exports.sendMail = sendMail;

exports.sendActiveMail = function(who, token, id, name) {
    var from = util.format('%s <%s>', config.name, config.mail_opts.auth.user);
    var to = who;
    var subject = config.name + '社区帐号激活';
    var html = '<p>您好：' + name + '</p>' +
        '<p>我们收到您在' + config.name + '社区的注册信息，请点击下面的链接来激活帐户：</p>' +
        '<a class="btn btn-success" href  = "' + SITE_ROOT_URL + '/active/user?accessToken=' + token + '&_id=' + id + '">激活链接</a>' +
        '<p>若您没有在' + config.name + '社区填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
        '<p>' + config.name + '社区 谨上。</p>';

    exports.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    });
};
