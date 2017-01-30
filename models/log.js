var mongoose = require('mongoose'), Schema = mongoose.Schema;

var logSchema = Schema({
    user_id: Number, //USER "FOREIGN KEY" reference should look like [{ type: Schema.Types.ObjectId, ref: 'User' }] in production
    activities: [{
        name: String,
        caloriesBurned: String
    }],
    foods: [{
        name: String,
        kcals: Number
    }],
    updated: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'log'
});

var Log = mongoose.model('Log', logSchema);

module.exports = {Log: Log};
