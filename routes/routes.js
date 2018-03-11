const router = require('express').Router();

const pollsController = require('../controllers/pollsController');
const optionsController = require('../controllers/optionsController');
const votesController = require('../controllers/votesController');
const usersController = require('../controllers/usersController');

router.use('/polls', pollsController);
router.use('/options', optionsController);
router.use('/votes', votesController);
router.use('/users', usersController);

module.exports = router;