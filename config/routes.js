var express = require('express');
var router  = express.Router();

var usersController           = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationsController');
var teamsController           = require('../controllers/teamsController');
var jobsController           = require('../controllers/jobsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/users')
.get(usersController.usersIndex);

router.route('/users/:id')
.get(usersController.usersShow)
.put(usersController.usersUpdate)
.delete(usersController.usersDelete);

router.route('/teams')
.get(teamsController.teamsIndex)
.post(teamsController.teamsCreate);

router.route('/teams/:id')
.get(teamsController.teamsShow)
.put(teamsController.teamsUpdate)
.delete(teamsController.teamsDelete);

router.route('/jobs')
.get(jobsController.jobsIndex)
.post(jobsController.jobsCreate);

router.route('/jobs/:id')
.get(jobsController.jobsShow)
.put(jobsController.jobsUpdate)
.delete(jobsController.jobsDelete);

module.exports = router;
