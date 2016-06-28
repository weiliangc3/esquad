var mongoose = require("mongoose");

var reviewSchema = mongoose.Schema({
  user:         { type: mongoose.Schema.ObjectId, ref: 'User' },
  rating:       Number,
  content:      String
}, {
  timestamps: true
});


module.exports = mongoose.model("Review", reviewSchema);
