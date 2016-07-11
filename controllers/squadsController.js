var Squad = require("../models/squad");
var User  = require("../models/user");

function squadsIndex(req, res){
  Squad.find({}, function(err, squads) {
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
  Squad.findById(req.params.id)
  .populate("leaders")
  .populate("members")
  .populate("appliedMembers")
  .populate("invitedMembers")
  .exec(function(err, squad){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ squad: squad });
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

  Squad.findById(id, function(err, squad){
    if (err) return res.status(500).json(err);
    if (!squad) return res.status(404).json(err);
    var squadToRemove = squad;

    // Sweep all member records from users
    for (i = 0; i < squadToRemove.members.length ; i++){
      var userId = squadToRemove.members[i]._id;
      User.findById(userId, function(err, user){
        var index = user.squads.indexOf(id);
        if (index > -1) user.squads.splice(index, 1);
        user.save(function(err){
          console.log(err);
        });
      });
    }

    // Sweep all invite records from users
    for (i = 0; i < squadToRemove.invitedMembers.length ; i++){
      var userId = squadToRemove.invitedMembers[i]._id;
      User.findById(userId, function(err, user){
        var index = user.squadsInvited.indexOf(id);
        if (index > -1) user.squadsInvited.splice(index, 1);
        user.save(function(err){
          console.log(err);
        });
      });
    }

    // Sweep all applications from users
    for (i = 0; i < squadToRemove.appliedMembers.length ; i++){
      var userId = squadToRemove.appliedMembers[i]._id;
      User.findById(userId, function(err, user){
        var index = user.squadsApplied.indexOf(id);
        if (index > -1) user.squadsApplied.splice(index, 1);
        user.save(function(err){
          console.log(err);
        });
      });
    }
  });

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
