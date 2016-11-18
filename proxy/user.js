var models = require('../models');
var UserModel = models.User;
var QuestionModel = models.Question;
var AnswerModel = models.Answer;
var cheerio = require('cheerio')
var async = require('async');

exports.saveUser = function(user, callback) {

    var _user = new UserModel(user);
    _user.save(function(err, doc) {
        callback(err, doc);
    })

}

exports.updateUserByID = function(id, filed, callback) {

    UserModel.update({ _id: id }, { $set: filed }, function(err, updateUser) {
        callback(err, updateUser);
    });

}

exports.findByEmail = function(email, callback) {
    UserModel.findOne({ email: email }, function(err, user) {
        callback(err, user);
    })
}

exports.activeUserById = function(id, accessToken, callback) {
        UserModel.findById(id, function(err, user) {
            if (err) return callback(err);
            if (user.accessToken == accessToken) {
                exports.updateUserByID(id, { active: true }, function(err) {
                    if (err) return callback(err);
                    callback(null, user);
                })
            };


        });
    }
    /*随机获取5条问题*/
exports.findRandomQuestion = function(callback) {

    async.times(5, function(n, callback) {
        QuestionModel.count().exec(function(err, count) {
            var random = Math.floor(Math.random() * count);
            QuestionModel.findOne().skip(random).populate('author').exec(
                function(err, question) {
                    callback(err, question);
                });
        });

    }, function(err, questions) {
        callback(err, questions);
    });
}

exports.getHotQuestion = function(skip, _callback) {


    QuestionModel.find({}).skip(skip).limit(5).sort('-visit').exec(function(err, questions) {
        if (err) {
            return _callback(err);
        }
        async.mapLimit(questions, 5, function(question, callback) {

            AnswerModel.findOne({ question: question._id })
                .populate('author')
                .sort('-vote_up_count').exec(function(err, answer) {
                    callback(err, { question: question, answer: answer });
                });

        }, function(err, results) {
            var arrayObject = [];
            results.forEach(function(val, index) {
                var object = {
                    "question_title": val.question.title,
                    "author_name": val.answer.author.nickname,
                    "author_signature": val.answer.author.signature,
                    "answer_content": delHtmlTag(val.answer.content).substring(0,200),
                    "answer_vote_up": val.answer.vote_up_count
                }
                arrayObject.push(object);
            })
            _callback(err, arrayObject);
        })
    });
}


exports.getHotAnswer = function(skip, callback) {

    AnswerModel.find({})
        .populate('author')
        .populate('question')
        .skip(skip).limit(5)
        .sort('-vote_up_count')
        .exec(function(err, answers) {
            var arrayObject = [];
            answers.forEach(function(val, index) {

                var object = {
                    "question_title": val.question.title,
                    "author_name": val.author.nickname,
                    "author_signature": val.author.signature,
                    // "answer_content": val.content.substring(0, 50),
                    "answer_content": delHtmlTag(val.content).substring(0,200),
                    "answer_vote_up": val.vote_up_count
                }
                arrayObject.push(object);
            })
            callback(err, arrayObject);
        })
}

function delHtmlTag(str) {
    return str.replace(/<[^>]+>/g, ""); //去掉所有的html标记
}

exports.getQuestionTopAnswer = function(question_id, callback) {
    AnswerModel.findOne({ question: question_id })
        .sort('-vote_up_count')
        .exec(function(err, answer) {
            callback(err, answer);
        });
}

exports.getQuestionAndAnswerById = function(question_id, callback) {

    QuestionModel.findOne({ _id: question_id }, function(err, question) {
        if (err) {
            return callback(err);
        }

        AnswerModel.find({ question: question_id })
            .sort('-vote_up_count')
            .populate('author')
            .exec(function(err, answers) {
                if (err) {
                    return callback(err);
                }
                var result = {
                    question: question,
                    answers: answers
                }
                console.log(result);
                callback(null, result);

            })
    })


}
