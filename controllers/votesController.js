const router = require('express').Router();

// const Poll = require('../models/polls');
// const Options = require('../models/options');
const Votes = require('../models/votes');

router.post('/', (req, res) => {
    console.log("Inside votes controller");

    console.log(req.body.option);
    console.log(req.body.pollId);

    let votes = new Votes({
        pollId: req.body.pollId,
        option: req.body.option
    });

    votes.save((err, result) => {
        if(err) {
            return res.status(500).json({
                message: "Cannot save vote",
                error: err
            });
        }
       

        res.status(200).json({
            message: "Vote saved successfully!",
            obj: result
        });
        console.log("VoTeS");
    });
});

router.get('/count/:id', (req, res) => {
    console.log("Inside vote/counts");

    Votes.count({ pollId: req.params.id }, (err, result) => {
        if(err) {
            return res.status(500).json({
                message: "Cannot get counts/:id",
                error: err
            });
        }

        res.status(200).json({
            result: result  
        });
    });

});

router.get('/counts/:pollId', (req, res) => {
    console.log("Inside counts/pollId");

    Votes.aggregate([
        {
            $match: {
                pollId: req.params.pollId
            }
        }, {
            $group: {
                _id: "$option",
                count: { $sum: 1 }
            }
        }
    ], (err, result) => {
        console.log("Result", result);

        if(err) {
            return res.status(500).json({
                message: "Cannot return count",
                error: err
            });
        }

        res.status(200).json({
            message: "Get count successful",
            _id: req.params.pollId,
            option: req.body.option
        })
    });
});


module.exports = router;