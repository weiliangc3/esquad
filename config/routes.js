var express = require('express');
var router  = express.Router();

var usersController           = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationsController');
var squadsController           = require('../controllers/squadsController');
var jobsController           = require('../controllers/jobsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/users')
.get(usersController.usersIndex);
router.route('/users/:id')
.get(usersController.usersShow)
.put(usersController.usersUpdate)
.delete(usersController.usersDelete);

router.route('/squads')
.get(squadsController.squadsIndex)
.post(squadsController.squadsCreate);
router.route('/squads/:id')
.get(squadsController.squadsShow)
.put(squadsController.squadsUpdate)
.delete(squadsController.squadsDelete);

router.route('/jobs')
.get(jobsController.jobsIndex)
.post(jobsController.jobsCreate);
router.route('/jobs/:id')
.get(jobsController.jobsShow)
.put(jobsController.jobsUpdate)
.delete(jobsController.jobsDelete);

// Custom routes
router.route('/users/updateSquads')
.post(usersController.usersUpdateSquads);

module.exports = router;
