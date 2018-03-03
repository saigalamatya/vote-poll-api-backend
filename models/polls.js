const mongoose = require('mongoose');

let Schema = mongoose.Schema;

var PollSchema = new Schema({
    poll: {
        type: String,
        required: true
    },
    isAnonymous: {
        type: Boolean,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    options: [{ type: Schema.Types.ObjectId, ref: 'Options' }]
});

module.exports = mongoose.model("Poll", PollSchema);