var Squad = require("../models/squad");

function squadsIndex(req, res){
  Squad.find({}, function(err, squad) {
    if (err) return res.status(404).json(err);
    res.status(200).json(squads);
  });
}

function squadsCreate(req, res){
  var squad = new Squad(req.body.squad);
  squad.save(function(err, squad){
    if (err) return res.status(500).json(err);
    res.status(201).json({ squad: squad });
  });
}

function squadsShow(req, res){
  User.findById(req.params.id)
  .populate("members")
  .populate("appliedMembers")
  .populate("invitedMembers")
  .exec(function(err, user){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ user: user });
  });
}

function squadsUpdate(req, res){
  var id = req.params.id;

  Squad.findByIdAndUpdate({ _id: id }, req.body, function(err, squad){
    if (err) return res.status(500).json(err);
    if (!squad) return res.status(404).json(err);
    res.status(200).json({ squad: squad });
  });
}

function squadsDelete(req, res){
  var id = req.params.id;

  Squad.remove({ _id: id }, function(err) {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Deleted!" });
  });
}

module.exports = {
  squadsIndex:  squadsIndex,
  squadsCreate: squadsCreate,
  squadsShow:   squadsShow,
  squadsUpdate: squadsUpdate,
  squadsDelete: squadsDelete
};
