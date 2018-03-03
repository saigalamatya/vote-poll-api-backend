const router = require('express').Router();

const pollsController = require('../controllers/pollsController');

router.use('/polls', pollsController);

module.exports = router;