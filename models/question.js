var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchmea = new Schema({
    title: String,
    content:String,
    up:Number,
    down:Number,
    topics:[top]
    answers: [answerSchema],
    create: {
        type: Date,
        default: Date.now
    }
});

module.exports = questionSchmea;