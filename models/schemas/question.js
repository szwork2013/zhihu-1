'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = require('./topic');
var answerSchema = require('./answer');


var questionSchema = new Schema({
    title: String,
    answers: [answerSchema],
    createTime: {
        type: Date,
        default: Date.now
    },
    topics: [topicSchema] //该问题话题
});

module.exports = questionSchema;
