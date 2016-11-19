var User = require('../proxy').User; //proxy user里面完成具体的业务
var path = require('path');
var tools = require('../common/tools');
var config = require('../config');
var mailer = require('../common/email');
var _ = require('lodash');
var sha1 = require('sha1');

exports.uploadFile = function(req, res, next) {
    var sampleFile;
    if (!req.files) {
        res.json({ code: 10002, msg: "no files were uploaded" });
        return;
    }
    sampleFile = req.files.image;
    var path =config.upload.path;
    Date.parse(new Date())
    var filename = sampleFile.name;
    var suffix = filename.substring(filename.indexOf('.'));
    var filename = Date.parse(new Date())+suffix;
    sampleFile.mv(path+filename, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ code: 10000, link: config.upload.url+filename});
            return;
        }
    });

}
