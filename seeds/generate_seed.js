var models = require('../models/schemas');
var mongoose = require('mongoose');


var testUsers = [
    {
        name: 'Test Guy',
        email: 'test@test.com',
        password: 'somethinghashedthiswaycomes',
        weight: 70,
        height: 180,
        age: 30
    },
    {
        name: 'Test Girl',
        email: 'nottest@test.com',
        password: 'newpassword',
        weight: 50,
        height: 150,
        age: 27
    }
];

var testActivites = [
    {
        name: 'light rowing',
        calFactor: 6
    },
    {
        name: 'lap swimming',
        calFactor: 3
    },
    {
        name: 'running 6mph',
        calFactor: 2
    }
];

var testLogs = [
    {
        user_id: 234235235,
        activities: {
            name: 'light rowing',
            caloriesBurned: '200'
        },
        food: {
            name: 'pizza',
            kcals: 600
        }
    },
    {
        user_id: 32423526,
        activities: {
            name: 'lap swimming',
            caloriesBurned: '250'
        },
        food: {
            name: 'carrots',
            kcals: 100
        }
    },
    {
        user_id: 3463421166,
        activities: {
            name: 'Running 6mph',
            caloriesBurned: '300'
        },
        food: {
            name: 'twinkie',
            kcals: 250
        }
    }
];

testUsers.forEach(function(usr){
    models.User.create({
        name: usr.name,
        email: usr.email,
        password: usr.password,
        weight: usr.weight,
        height: usr.height,
        age: usr.age
    });
});

testActivites.forEach(function (activity){
    models.Activity.create({
        name: activity.name,
        calFactor: activity.calFactor
    });
});

testLogs.forEach(function (log){
    console.log(log.activities);
    console.log(log.food);
    models.Log.create({
        user_id: log.user_id,
        activities: log.activities,
        foods: log.food
    });
});

mongoose.connection.close();
