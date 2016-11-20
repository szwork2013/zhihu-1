var models =require('../models');
var TopicModel = models.Topic;


exports.findTopicByName = function (query_word,callback) {
// mogoose通过正则表达式支持模糊查询
	var queryRegExp =new RegExp(query_word);
	TopicModel.find({name:queryRegExp},function (err,topics) {
		callback(err,topics);
	});
}
