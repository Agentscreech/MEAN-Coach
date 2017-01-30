var mongoose = require('mongoose'),Schema = mongoose.Schema;

var userSchema = Schema
({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    weight: Number, // in kg
    height: Number, // in cm
    age: Number,
}, {collection: 'users'});

var activitySchema = Schema({
    name: String,
    calFactor: Number, // !!NEED TO STORE THE VALUE AT 10X SO IT IS A WHOLE NUMBER!! the multiplier for kcal/hr based on weight
}, {collection: 'activities'});

var logSchema = Schema({
    user_id: Number, //USER "FOREIGN KEY" reference should look like [{ type: Schema.Types.ObjectId, ref: 'User' }] in production
    activities: [{
        name: String,
        caloriesBurned: String
    }],
    foods: [{
        name:String,
        kcals: Number
    }],
    updated: { type: Date, default: Date.now }
}, {collection: 'log'});

var User = mongoose.model('User', userSchema);
var Activity = mongoose.model('Activity', activitySchema);
var Log = mongoose.model('Log', logSchema);

module.exports = {
    User: User,
    Activity: Activity,
    Log: Log
};
