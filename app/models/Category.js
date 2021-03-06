var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator'),
    ObjectId = Schema.Types.ObjectId,
    Mixed = Schema.Types.Mixed;


var CategorySchema = new Schema({
    key: {type: String, unique: true, required: true},
    // -1 已删除, 0 服务器抓取未确认, 1已确认
    status: {type: Number, required: true},
    taobaoInfo: {
        cid: {type: Number, unique: true, required: true},
        parent_cid: Number,
        name: String,
        is_parent: Boolean,
        status: String,
        sort_order: Number,
        features: [
            Mixed
        ]
    }
});

var Category = mongoose.model('Category', CategorySchema);

module.exports.queryAllCats = exports.queryAllCats = function (cb) {
    return Category.find(null, function (err, data) {
        if ("function" === typeof cb) {
            cb(err, data);
        } else {
            return data;
        }
    });
}

module.exports.queryConfirmedCats = exports.queryConfirmedCats = function (cb) {
    return Category.find({status: 1}, function (err, data) {
        if ("function" === typeof cb) {
            cb(err, data);
        } else {
            return data;
        }
    })
}

module.exports.schema = exports.schema = CategorySchema;

module.exports.model = exports.model = Category;