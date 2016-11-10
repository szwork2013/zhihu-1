var mongoose = require('mongoose');
var BaseModel = require("./base_model");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var AnswerSchema = new Schema({
    content: { type: String },
    question: { type: ObjectId, ref: 'Question' },
    author: { type: ObjectId, ref: 'User' },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
   	vote_up_count: { type: Number, default: 0 },
    vote_down_count: { type: Number, default: 0 },
/*    vote_up: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    vote_down: [{ type: Schema.Types.ObjectId, ref: 'User' }]*/
    deleted: { type: Boolean, default: false }
});

ReplySchema.plugin(BaseModel);

mongoose.model('Answer', AnswerSchema);
