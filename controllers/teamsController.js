var Team = require("../models/team");

function teamsIndex(req, res){
  Team.find({}, function(err, team) {
    if (err) return res.status(404).json(err);
    res.status(200).json(teams);
  });
}

function teamsCreate(req, res){
  var team = new Team(req.body.team);
  team.save(function(err, team){
    if (err) return res.status(500).json(err);
    res.status(201).json({ team: team });
  });
}

function teamsShow(req, res){
  User.findById(req.params.id)
  .populate("teams")
  .populate("teamsApplied")
  .populate("teamsInvited")
  .populate("backup")
  .exec(function(err, user){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ user: user });
  });
}

function teamsUpdate(req, res){
  var id = req.params.id;

  Team.findByIdAndUpdate({ _id: id }, req.body, function(err, team){
    if (err) return res.status(500).json(err);
    if (!team) return res.status(404).json(err);
    res.status(200).json({ team: team });
  });
}

function teamsDelete(req, res){
  var id = req.params.id;

  Team.remove({ _id: id }, function(err) {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Deleted!" });
  });
}

module.exports = {
  teamsIndex:  teamsIndex,
  teamsCreate: teamsCreate,
  teamsShow:   teamsShow,
  teamsUpdate: teamsUpdate,
  teamsDelete: teamsDelete
};
