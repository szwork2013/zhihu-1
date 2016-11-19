var models = require('../models');
var QuestionModel = models.Question;

exports.saveQuestion = function(question, callback) {
    QuestionModel.create(question, function(err, result) {
        callback(err, result);
    });
}

exports.findById = function(question_id, callback) {
    QuestionModel.findById({ _id: question_id }, function(err, question) {
        callback(err, question);
    })
}
