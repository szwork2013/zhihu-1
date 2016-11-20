var express = require('express');
var auth = require('../middlewares/auth');
var limit = require('../middlewares/limit');
var validate = require('../middlewares/validate');
var config = require('../config');
var user = require('../controllers/user');
var file = require('../controllers/file');
var topic = require('../controllers/topic');
var router = express.Router();

router.post('/askQuestion', auth.login,validate.questionInfo, user.askQuestion);//提问
router.post('/queryTopic', topic.queryTopic);
router.post('/uploadFile', file.uploadFile);
router.get('/', user.checkCookie);
router.post('/user/isLogin', validate.login);
router.post('/signin', validate.loginInfo, user.login);
router.get('/active', user.getActivePage);
router.get('/explore', user.explore);//发现首页
router.get('/active/user', user.activeUser);//激活用户
router.post('/signup', validate.userInfo, user.register);//注册
router.post('/question/topAnswer', user.getQuestionTopAnswer);//获取问题答案，按点赞排序
router.post('/getHotQuestion', user.getHotQuestion);//获取热门问题
router.post('/getHotAnswer', user.getHotAnswer);//获取热门答案问题
router.get('/question/:question_id', user.getQuestionAndAnswerById);//问题详情
router.post('/submitAnswer',user.submitAnswer);//提交答案
router.get('/logout', user.logout);
router.get('/error', function(req, res, next) {
    res.render('error');
});
router.get('/signup', function(req, res, next) {
    res.render('index');
});
module.exports = router;
