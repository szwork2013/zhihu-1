'use strict'

var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs'); //加载加密模块

var userSchema = require('./schemas/user');

/*使用mongoose的模型方法编译生成User模型*/
var User = mongoose.model('User', userSchema);
/*导出生成用户模型*/
module.exports = User;
