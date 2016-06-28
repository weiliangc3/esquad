var Job   = require('../models/job');

function jobsIndex(req, res) {
  Job.find(function(err, jobs){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ jobs: jobs });
  });
}

function jobsShow(req, res){
  Job.findById(req.params.id)
  .exec(function(err, job){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ job: job });
  });
}

function jobsUpdate(req, res){
  Job.findById(req.params.id,  function(err, job) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!job) return res.status(404).json({message: 'No job found.'});

    if (req.body.email) job.local.email = req.body.name;
    if (req.body.password) job.local.password = req.body.password;

    job.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong!"});

      res.status(201).json({message: 'Job successfully updated.', job: job});
    });
  });
}

function jobsDelete(req, res){
  Job.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(500).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'Job has been successfully deleted'});
  });
}

module.exports = {
  jobsIndex:  jobsIndex,
  jobsShow:   jobsShow,
  jobsUpdate: jobsUpdate,
  jobsDelete: jobsDelete
};
