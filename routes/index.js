var express = require('express');
var auth = require('../middlewares/auth');
var limit = require('../middlewares/limit');
var validate = require('../middlewares/validate');
var config = require('../config');
var user = require('../controllers/user');
var router = express.Router();

// home page
router.get('/', function(req, res, next) {
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)

    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
    res.render('index');
});

router.get('/login', function(req, res, next) {
    res.redirect('/');
});

router.get('/active', function(req, res, next) {
    res.render('active');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.get('/active/user', user.activeUser);




router.post('/register', validate.validateRegister, user.register);

module.exports = router;
