var mongoose = require('mongoose');
var BaseModel = require("./base_model");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var QuestionSchema = new Schema({
    title: { type: String },
    content: { type: String },
    author: { type: ObjectId, ref: 'User' },
    top: { type: Boolean, default: false }, //问题置顶
    good: { type: Boolean, default: false }, // 精华问题
    lock: { type: Boolean, default: false }, // 问题被锁定
    answer_count: { type: Number, default: 0 },//答案数量
    visit_count: { type: Number, default: 0 },//访问数量
    collect_count: { type: Number, default: 0 },//收场数量
    create_at: { type: Date, default: Date.now },//创建时间
    update_at: { type: Date, default: Date.now },//更新时间
    deleted: { type: Boolean, default: false }//是否删除
});

QuestionSchema.plugin(BaseModel);

mongoose.model('Question', QuestionSchema);
