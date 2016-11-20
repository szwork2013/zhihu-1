var models = require('../models');
var AnswerModel = models.Answer;
var QuestionModel = models.Question;



exports.createAnswer = function(answer, callback) {
	console.log(answer);
    QuestionModel.findOne({ _id: answer.question }, function(err, _question) {
        if (err) { console.log(err) }
        	console.log(_question);
        answer.question = _question;
        AnswerModel.create(answer, function(err, result) {
            if (err) { console.log(err) }
            AnswerModel.findOne({ _id: result._id })
                .populate('author')
                .exec(function(err, _answer) {
                	console.log(answer);
                    callback(err, _answer);
                });

        })
    })
}
