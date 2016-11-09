var mongoose = require('mongoose');
var Schema = mongoose.Schema;

val topicSchmea = new Schema({
    name:{
        type:String,
        unique:true
    },
    des:String,
    quesCount:{
        type:Number,
        min:0
    },
    images:String
});




/*User.update({ _id: "5822d4d2d4a16f2a4864bc57" }, { $set: { username: 'fengdali' } }, function(err, doc) {

});*/


/*
//update username
User.findById("5822d4d2d4a16f2a4864bc57", function (err, user) {
  if (err) return handleError(err);
  
  user.username = 'update name';
  user.save(function (err, updatedUser) {
    if (err) return handleError(err);
    console.log(updatedUser)
  });
});*/


//nested populate
/*Question.findOne().populate({
    path: 'answers',
    populate: {
        path: 'author',
        model: 'User'
    }
}).exec(function(err, parent) {

    var doc = parent.answers.id("5822e9bd4982e937a84c58d6").remove();
    parent.save(function(err) {
        if (err) return handleError(err);
        console.log('the sub-doc was removed')
    });
});*/


/*user.save(function(err) {
    if (err) return console.log('save user failed', err);
    answer1.save(function(err) {
        if (err) return console.log('save answer1 failed', err);
        answer2.save(function(err) {
            if (err) return console.log('save answer2 failed', err);
            question.save(function(err, document) {
                if (err) return console.log('save question failed', err);
                console.log(document);
            })
        })

    })
});*/



Question.findById("5822fbe61c48fa35b00e4575", function(err, parent) {
    var doc = parent.answers.id("5822fbe61c48fa35b00e4573").remove();
    parent.save(function(err) {
        if (err) return handleError(err);
        console.log('the sub-doc was removed')
    });
});
