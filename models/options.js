const mongoose = require('mongoose');

let Schema = mongoose.Schema;

var OptionsSchema = new Schema({
    options: {
        type: [],
        required: true
    },
    poll: { type: Schema.Types.ObjectId, ref: 'Poll' }
});

module.exports = mongoose.model("Options", OptionsSchema);

