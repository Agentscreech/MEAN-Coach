var mongoose = require('mongoose'), Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    weight: Number, // in kg
    height: Number, // in cm
    age: Number,
}, {
    collection: 'users'
});

UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var returnJson = {
            id: ret._id,
            email: ret.email,
            name: ret.name
        };
        return returnJson;
    }
});

UserSchema.methods.authenticated = function(password) {
    var user = this;
    var isAuthenticated = bcrypt.compareSync(password, user.password);
    //Ternary if isAuthenticated then user, else false
    return isAuthenticated ? user : false;
};

//Mongoose schema hook
UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        next();
    } else {
        this.password = bcrypt.hashSync(this.password, 10);
        next();
    }
});

var activitySchema = Schema({
    name: String,
    calFactor: Number, // !!NEED TO STORE THE VALUE AT 10X SO IT IS A WHOLE NUMBER!! the multiplier for kcal/hr based on weight
}, {
    collection: 'activities'
});

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

var User = mongoose.model('User', userSchema);
var Activity = mongoose.model('Activity', activitySchema);
var Log = mongoose.model('Log', logSchema);

module.exports = {
    User: User,
    Activity: Activity,
    Log: Log
};
