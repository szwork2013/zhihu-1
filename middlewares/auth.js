


exports.login = function(req, res, next) {
    if (req.session.login) {
        return next();
    }else{
        res.redirect('/');
    }
};
