var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserAnswerSchema = new Schema({
  user: { type: ObjectId,ref:'User' },
  answer: { type: ObjectId,ref:'Answer' },
  create_at: { type: Date, default: Date.now }
});

UserAnswerSchema.plugin(BaseModel);
UserAnswerSchema.index({user: 1, answer: 1}, {unique: true});

mongoose.model('UserAnswer', UserAnswerSchema);
