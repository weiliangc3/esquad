var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');
var review   = require("./review");

var userSchema = mongoose.Schema({
  local: {
    fullname: { type: String },
    email:    { type: String, unique: true, required: true },
    password: { type: String, required: true }
  },
  teams:          [{ type: mongoose.Schema.ObjectId, ref: 'Team' }],
  teamsApplied:   [{ type: mongoose.Schema.ObjectId, ref: 'Team' }],
  teamsInvited:   [{ type: mongoose.Schema.ObjectId, ref: 'Team' }],
  backup:         [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  skills:         [String],
  reviews:        [review],
  type:           String
}, {
  timestamps: true
});

// INCLUDE PASSWORD CONFIRMATION

userSchema.statics.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", userSchema);
