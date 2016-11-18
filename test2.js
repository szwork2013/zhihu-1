var User = require('./models').User; //proxy user里面完成具体的业务
var Question = require('./models').Question; //proxy user里面完成具体的业务
var Answer = require('./models').Answer; //proxy user里面完成具体的业务
var Question = require('./models').Question; //proxy user里面完成具体的业务
var tools = require('./common/tools');
var config = require('./config');
var mailer = require('./common/email');
var _ = require('lodash');
var sha1 = require('sha1');
var validator = require('validator');
var logger = require('./common/logger').logger //引入日志文件
var S = require('string');



/*Question.findOne({ _id: '582c3f668e110b3258df48d8' }, 'title content', function(err, person) {
    if (err) return handleError(err);
    console.log(person);
});*/

/*Question.find({}, function(err, questions) {
    questions.forEach(function(question, index) {
        if (S(question.visit_count).contains('K')) {
            question.visit = parseInt(question.visit_count.replace("K", "000"));
        } else {
            question.visit = parseInt(question.visit_count);
        }

           question.save(function(err, question) {
                logger.debug(question.visit);
            });
    });
})*/



/*Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).
  sort('-occupation').
  select('name occupation').
  exec(callback);*/
/**/



/*Question.find({}).
limit(10).
sort('-visit').
select('title content visit').
exec(function(err, questions) {
    questions.forEach(function(question, index) {
        console.log(question.visit);
    })
});*/

/*Answer.find({ author: null }, function(err, answers) {
	answers.forEach(function (answer) {
		console.log(answer.content);
	})
    console.log(answers.length);
})*/

User.find({nickname:"写手K君"},function (err,user) {
	console.log(user)
})

/*
Question.count().exec(function(err, count) {
    var random = Math.floor(Math.random() * count);
    Question.find().skip(random).limit(10).exec(
        function(err, results) {
            results.forEach(function(result, index) {
                console.log(result.title);
            })
        });
});*/


/*User.find({}).
exec(function(err, users) {
    users.forEach(function(user, index) {
        user.questions.forEach(function (question_id,index) {
        	Question.findOne({_id:question_id},function (err,question) {
        		question.author=user;
        		question.save(function (err,_question) {
        			console.log(_question.title+"保存")
        			if(err){
        				console.log(err);
        			}
        		})
        	});
        })
    })
});*/


/*User.find({}).
exec(function(err, users) {
    users.forEach(function(user, index) {
        user.answers.forEach(function(answer_id, index) {
            Answer.findOne({ _id: answer_id }, function(err, answer) {
                answer.author = user;
                answer.save(function(err, _answer) {
                    console.log(_answer.question_url + "保存")
                    if (err) {
                        console.log(err);
                    }
                })
            });
        })
    })
});*/
