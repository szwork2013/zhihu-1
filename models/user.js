var mongoose = require('mongoose');
var BaseModel = require("./base_model");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
    username: { type: String },
    pass: { type: String },
    email: { type: String, unique: true },
    profile_image_url: { type: String },
    location: { type: String },
    colleage: { type: String }
    signature: { type: String },
    profile: { type: String },
    avatar: { type: String },
    question_count: { type: Number, default: 0 },
    answer_count: { type: Number, default: 0 },
    answer_up_count: { type: Number, default: 0 },
    answer__down_count: { type: Number, default: 0 },
    follower_count: { type: Number, default: 0 },
    following_count: { type: Number, default: 0 },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    active: { type: Boolean, default: false },
    accessToken: { type: String },
    questions:[type:ObjectId,ref:'Question'],
    answers:[type:ObjectId,ref:'Answer']
});

UserSchema.plugin(BaseModel);
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.pre('save', function(next) {
    var now = new Date();
    this.update_at = now;
    next();
});
mongoose.model('User', UserSchema);
