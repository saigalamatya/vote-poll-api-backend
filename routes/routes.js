const router = require('express').Router();

const pollsController = require('../controllers/pollsController');
const optionsController = require('../controllers/optionsController');
const votesController = require('../controllers/votesController');

router.use('/polls', pollsController);
router.use('/options', optionsController);
router.use('/votes', votesController);

module.exports = router;