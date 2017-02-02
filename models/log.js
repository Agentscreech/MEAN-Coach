var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var moment = require('moment');

var LogSchema = Schema([{
    // user_id:{ type: Number, ref: 'User' }, //USER "FOREIGN KEY" reference should look like [{ type: Schema.Types.ObjectId, ref: 'User' }] in production
    date: String,
    activities: [{
        name: String,
        caloriesBurned: Number
    }],
    foods: [{
        name: String,
        // UPC: String,
        kcals: Number
    }],
    updated: {
        type: Date,
        default: Date.now
    }
}], {
    collection: 'log'
});

// var Log = mongoose.model('Log', LogSchema);


module.exports = mongoose.model('Log', LogSchema);
