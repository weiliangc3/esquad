var mongoose = require("mongoose");
var review   = require("./review");

var squadSchema = mongoose.Schema({
  name:               { type: String , required: true },
  location:           String,
  description:        String,
  specialties:        [String],
  leaders:            [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  members:            [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  invitedMembers:     [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  appliedMembers:     [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  reviews:            [review],
  available:          Boolean,
}, {
  timestamps: true
});


module.exports = mongoose.model("Squad", squadSchema);
