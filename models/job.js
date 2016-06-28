var mongoose = require("mongoose");

var jobSchema = mongoose.Schema({
  name:         String,
  description:  String
}, {
  timestamps: true
});


module.exports = mongoose.model("Job", jobSchema);
