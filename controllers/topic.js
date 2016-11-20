var Topic = require('../proxy').Topic; //proxy user里面完成具体的业务
var tools = require('../common/tools');
var config = require('../config');
var _ = require('lodash');

exports.queryTopic = function(req, res, next) {

	var query_word = req.body.query_word;
	Topic.findTopicByName(query_word,function (err,topics) {
		if(err) return next(err);
		res.json(topics);
	});

}








