var express = require('express');
var auth = require('../middlewares/auth');
var limit = require('../middlewares/limit');
var validate = require('../middlewares/validate');
var config = require('../config');
var user = require('../controllers/user');
var file = require('../controllers/file');
var topic = require('../controllers/topic');
var router = express.Router();

router.post('/askQuestion', user.askQuestion);
router.post('/queryTopic', topic.queryTopic);
router.post('/uploadFile', file.uploadFile);
router.get('/', user.checkCookie);
router.post('/user/isLogin', validate.login);
router.get('/signup', function(req, res, next) {
    res.render('index');
});
router.get('/nav', function(req, res, next) {
    res.render('nav')
});
router.post('/signin', user.login);
router.get('/active', user.getActivePage);
router.get('/explore', user.explore);
router.get('/active/user', user.activeUser);
router.post('/signup', validate.userInfo, user.register);
router.post('/question/topAnswer', user.getQuestionTopAnswer);
router.post('/getHotQuestion', user.getHotQuestion);
router.post('/getHotAnswer', user.getHotAnswer);
router.get('/question/:question_id', user.getQuestionAndAnswerById);
router.post('/submitAnswer', user.submitAnswer);
router.get('/logout', user.logout);
router.get('/error', function(req, res, next) {
    res.render('error');
});
module.exports = router;
