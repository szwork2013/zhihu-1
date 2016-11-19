var models = require('../models');
var AnswerModel = models.Answer;



exports.createAnswer = function(answer, callback) {

    AnswerModel.create(answer, function(err, result) {
    	console.log(result);
        AnswerModel.findOne({_id:result._id})
            .populate('author')
            .exec(function(err, _answer) {
                callback(err,_answer);
            });

    })

}
