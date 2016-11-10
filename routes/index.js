var express = require('express');
var auth = require('../middlewares/auth');
var limit = require('../middlewares/limit');
var config = require('../config');
var user = require('../controllers/user');
var router = express.Router();

// home page
router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;
