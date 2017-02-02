var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var LogSchema = mongoose.Schema(
    {
    date: String,
    activities: [{
        name: String,
        caloriesBurned: Number
    }],
    foods: [{
        name: String,
        kcals: Number
    }],
    updated: {
        type: Date,
        default: Date.now
    }
},{_id: false});

var UserSchema = mongoose.Schema({
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
    gender: String,
    age: Number,
    goal: Number,
    isMetric: Boolean,
    logs: [LogSchema]
}, {
    collection: 'users'
});

UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var returnJson = {
            id: ret._id,
            email: ret.email,
            weight: ret.weight,
            height: ret.height,
            gender: ret.gender,
            age: ret.age,
            goal: ret.goal,
            isMetric: ret.isMetric
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

module.exports = mongoose.model('User', UserSchema);
