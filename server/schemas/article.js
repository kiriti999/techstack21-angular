
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

var articleSchema = new Schema({
    "title": { type: String, required: true, unique: false },
    "details": String,
    "username": { type: String, required: true, unique: false },
    "postImageUrl": String,
    "url": { type: String },
    "categories": [String],
    "category": { type: Schema.Types.ObjectId, ref: 'Category' },
    "created_at": { type: Date, default: Date.now }
}, {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });

articleSchema.plugin(deepPopulate);

var article = mongoose.model('article', articleSchema);
module.exports = article;