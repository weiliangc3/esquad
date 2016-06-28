var Job   = require('../models/job');

function jobsIndex(req, res){
  Job.find({}, function(err, job) {
    if (err) return res.status(404).json(err);
    res.status(200).json(jobs);
  });
}

function jobsCreate(req, res){
  var job = new Job(req.body.job);
  job.save(function(err, job){
    if (err) return res.status(500).json(err);
    res.status(201).json({ job: job });
  });
}

function jobsShow(req, res){
  User.findById(req.params.id)
  .populate("members")
  .exec(function(err, user){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ user: user });
  });
}

function jobsUpdate(req, res){
  var id = req.params.id;

  Job.findByIdAndUpdate({ _id: id }, req.body, function(err, job){
    if (err) return res.status(500).json(err);
    if (!job) return res.status(404).json(err);
    res.status(200).json({ job: job });
  });
}

function jobsDelete(req, res){
  var id = req.params.id;

  Job.remove({ _id: id }, function(err) {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Deleted!" });
  });
}

module.exports = {
  jobsIndex:  jobsIndex,
  jobsCreate: jobsCreate,
  jobsShow:   jobsShow,
  jobsUpdate: jobsUpdate,
  jobsDelete: jobsDelete
};
