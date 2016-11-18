var mongoose = require('mongoose');
var BaseModel = require("./base_model");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var AnswerSchema = new Schema({
    content: { type: String },
    question: { type: ObjectId, ref: 'Question' },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    vote_up_count: { type: Number, default: 0 },
    vote_down_count: { type: Number, default: 0 },
    author_name: { type: String },
    author: { type: ObjectId, ref: 'User' },
    deleted: { type: Boolean, default: false }
});

AnswerSchema.plugin(BaseModel);

mongoose.model('Answer', AnswerSchema);
