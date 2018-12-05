var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CategorySchema = new Schema({
  titie: { type: String, unique: true, lowercase: true },
  created: { type: Date, default: Date.now }
});

var category = mongoose.model("category", CategorySchema);

module.exports = category;
