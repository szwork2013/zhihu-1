'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var answerSchema = new Schema({
    content: String,
    create: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    up: [{ userID: { type: String, ref: 'User' } }], //点赞人
    down: [{ userID: { type: String, ref: 'User' } }] //反对
});

module.exports = answerSchema;
