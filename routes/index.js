var express = require('express');
var auth = require('../middlewares/auth');
var limit = require('../middlewares/limit');
var validate = require('../middlewares/validate');
var config = require('../config');
var user = require('../controllers/user');
var file = require('../controllers/file');
var topic = require('../controllers/topic');
var router = express.Router();


router.post('/queryTopic',topic.queryTopic);

// home page
router.get('/nav', function (req,res,next) {
	res.render('nav')
});

router.post('/uploadFile',file.uploadFile);

router.get('/', user.checkCookie);

router.get('/user/isLogin',validate.login);

// router.post('/askQuestion',validate.login,user.askQuestion);

router.get('/signup', function(req, res, next) {
    res.render('index');
});

router.post('/signin', user.login);

router.get('/active', function(req, res, next) {
    res.render('active');
});

router.get('/explore', function(req, res, next) {
    res.render('explore');
});



router.get('/active/user', user.activeUser);

router.post('/signup', validate.userInfo, user.register);

module.exports = router;
