var mongoose = require("mongoose");
var review   = require("./review");

var teamSchema = mongoose.Schema({
  name:               { type: String , required: true },
  location:           String,
  description:        String,
  specialties:        [String],
  members:            [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  invitedMembers:     [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  appliedMembers:     [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  reviews:            [review],
}, {
  timestamps: true
});


module.exports = mongoose.model("Team", teamSchema);
