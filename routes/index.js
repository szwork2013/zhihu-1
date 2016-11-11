var express = require('express');
var auth = require('../middlewares/auth');
var limit = require('../middlewares/limit');
var validate = require('../middlewares/validate');
var config = require('../config');
var user = require('../controllers/user');
var router = express.Router();

// home page
router.get('/', user.checkCookie);

router.get('/login', function(req, res, next) {
    res.render('index');
});

router.post('/login', user.login);

router.get('/active', function(req, res, next) {
    res.render('active');
});

router.get('/explore', function(req, res, next) {
    res.render('explore');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.get('/active/user', user.activeUser);




router.post('/register', validate.userInfo, user.register);

module.exports = router;
