var models = require('../models');
var UserModel = models.User;

exports.saveUser = function(user, callback) {

    var _user = new UserModel(user);
    _user.save(function(err, doc) {
        callback(err, doc);
    })

};

exports.updateUserByID = function(id, filed, callback) {

    UserModel.update({ _id: id }, { $set: filed }, function(err, updateUser) {
        callback(err, updateUser);
    });

}

exports.findByEmail = function (email,callback) {
    UserModel.findOne({email:email},function (err,user) {
        callback(err,user);
    })
}

exports.activeUserById = function(id, accessToken, callback) {
    UserModel.findById(id, function(err, user) {
    	if(err) return callback(err);
        if (user.accessToken == accessToken) {
            exports.updateUserByID(id, { active: true }, function(err) {
                if (err) return callback(err);
                callback(null, user);
            })
        };


    });
}
