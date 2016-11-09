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
    }
});

var Answer = mongoose.model('Answer', answerSchema);
