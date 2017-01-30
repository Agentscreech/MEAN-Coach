var mongoose = require('mongoose'), Schema = mongoose.Schema;

var activitySchema = Schema({
    name: String,
    calFactor: Number, // !!NEED TO STORE THE VALUE AT 10X SO IT IS A WHOLE NUMBER!! the multiplier for kcal/hr based on weight
}, {
    collection: 'activities'
});

var Activity = mongoose.model('Activity', activitySchema);

module.exports = {Activity: Activity};
