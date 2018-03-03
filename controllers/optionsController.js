const router = require('express').Router();

const Poll = require('../models/polls');
const Options = require('../models/options');

router.get('/', (req, res) => {

    console.log("Inside options /GET route");
    
    Options.find({}, (err, result) => {
        if(err) {
            return res.status(500).json({
                message: "Error /GET options",
                error: err
            });
        }

        return res.status(201).json({
            message: "/GET options success",
            obj: result
        });
    });

});

module.exports = router;