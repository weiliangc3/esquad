var User   = require('../models/user');

function usersIndex(req, res) {
  User.find(function(err, users){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ users: users });
  });
}

function usersShow(req, res){
  User.findById(req.params.id)
  .populate("squads")
  .populate("squadsApplied")
  .populate("squadsInvited")
  .populate("backup")
  .exec(function(err, user){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ user: user });
  });
}

function usersUpdate(req, res){
  User.findById(req.params.id,  function(err, user) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!user) return res.status(404).json({message: 'No user found.'});

    if (req.body.fullname) user.local.fullname = req.body.fullname;
    if (req.body.password) user.local.password = req.body.password;

    user.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong!"});

      res.status(201).json({message: 'User successfully updated.', user: user});
    });
  });
}

function usersDelete(req, res){
  User.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(500).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'User has been successfully deleted'});
  });
}

function usersAddSquad(req, res){
  User.findById(req.body.id,  function(err, user) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!user) return res.status(404).json({message: 'No user found.'});

    user.squads.push(req.body.squad);
    user.save(function(err){
      if (err) return res.status(500).json({message: "Something went wrong updating the user!"});

      res.status(201).json({message: 'Squad added', user: user});
    });
  });

}

module.exports = {
  usersIndex:     usersIndex,
  usersShow:      usersShow,
  usersUpdate:    usersUpdate,
  usersDelete:    usersDelete,
  usersAddSquad:  usersAddSquad
};
