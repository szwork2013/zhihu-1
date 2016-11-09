'use strict'

var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs'); //加载加密模块
var Schema = mongoose.Schema;
var questionSchema = require('./question') //userSchema 依赖questionSchema
var topicSchema = require('./topic') //userSchema 依赖topicSchema
var userSchema = new Schema({
    email: {
        unique: true,
        type: String
    }, //邮箱
    createTime:{
        type:Date,
        default:Date.now
    },
    logo: String, //头像
    sex: Boolean, //性别 1：男 0：女
    motto: String, //座右铭
    username: String, //用户姓名
    password: String, //密码
    colleage: String, //大学
    major:String,//专业
    industry:String,//行业
    location:String,//地址
    questions: [questionSchema], //关注问题
    topics: [topicSchema], //关注话题
    users: [{ userID: { type: String, ref: 'User' } }]//关注用户

});
// 实例方法，通过实例可以调用
userSchema.methods = {
    //密码校验
    comparePassword: function(password, cb) {
        bcrypt.compare(password, this.password, function(err, isMatch) {
            cb(err, isMatch);
        });
    }
};

module.exports = userSchema;
