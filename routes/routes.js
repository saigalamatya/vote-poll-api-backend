const router = require('express').Router();

const pollsController = require('../controllers/pollsController');
const optionsController = require('../controllers/optionsController');

router.use('/polls', pollsController);
router.use('/options', optionsController);

module.exports = router;