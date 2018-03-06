const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const VoteSchema = Schema({

    pollId: { type: String, required: true },
    option: { type: String, required: true }

});

module.exports = mongoose.model("Votes", VoteSchema)