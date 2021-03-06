const router = require('express').Router();

const Poll = require('../models/polls');
const Options = require('../models/options');

const PollsService = require('../services/pollsService');

let pollsService = new PollsService();

router.post('/', (req, res) => {

    console.log("Inside req body", req.body);

    let options = new Options({
        options: req.body.options
    });

    options.save((err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Could not save options!",
                error: err
            });
        }


        let poll1 = new Poll({
            poll: req.body.poll,
            isAnonymous: req.body.isAnonymous,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            // options: result._id
            options: options._id
        });

        poll1.save((err, poll) => {
            if (err) {
                return res.status(500).json({
                    message: "Poll create unsuccessful",
                    error: err
                });
            }

            res.status(201).json({
                message: "Poll create successful",
                obj: poll
            });
        });
    });

    // pollsService.createPoll(req.body).then((result) => {
    //     res.status(201).json({
    //         message: "Poll successful",
    //         obj: result
    //     });
    // }).catch((err) => {
    //     res.status(500).json({
    //         message: "Poll unsuccessful",
    //         obj: err
    //     });
    // });

});

router.get('/', (req, res) => {

    console.log("inside control /GET ");

    Poll.find()
        .populate('options')
        .exec((err, polls) => {
            if (err) {
                res.status(500).json({
                    message: "Polls /GET unscuccessful",
                    error: err
                });
            }

            res.status(200).json({
                message: "Polls /GET successful",
                obj: polls
            })
        });

    // pollsService.getPoll().then((poll) => {
    //     res.status(201).json({
    //         message: "/GET successful",
    //         obj: poll
    //     });
    // }).catch((err) => {
    //   _i  res.status(500).json({
    //         message: "Error fetching /GET",
    //         obj: err
    //     });
    // });

});

router.get('/:id', (req, res) => {

    console.log("Inside /GET polls/options");

    Poll.find({ _id: req.params.id })
        .populate('options')
        .exec((err, results) => {
            if(err) {
                res.status(500).json({
                    message: "Polls /GET polls/options unsuccessful",
                    obj: err
                })
            }

            res.status(200).json({
                message: "Polls /GET polls/options successful",
                obj: results
            })
        })
});


module.exports = router;