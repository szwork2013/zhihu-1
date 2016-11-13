var mongoose = require('mongoose');
var BaseModel = require("./base_model");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var TopicSchema = new Schema({
  name: { type: String },
  desc: { type: String },
  avator:{type:String},
  author_id: { type: ObjectId,ref:'User' },//话题创建者
  create_at: { type: Date, default: Date.now },
  deleted: {type: Boolean, default: false},//是否删除
  questions:[{type:ObjectId,ref:'Question'}]
});

TopicSchema.plugin(BaseModel);
TopicSchema.pre('save', function(next) {
    var now = new Date();
    this.update_at = now;
    next();
});
mongoose.model('Topic', TopicSchema);
