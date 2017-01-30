var models = require('../models/schemas');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/meancoach');

var activities = [{
        name: "Backpacking",
        calFactor: 3.33
    },
    {
        name: "Baseball",
        calFactor: 2.38
    },
    {
        name: "Basketball",
        calFactor: 3.81
    },
    {
        name: "Bicycling (High Effort)",
        calFactor: 7.62
    },
    {
        name: "Bicyling (Moderate Effort)",
        calFactor: 3.27
    },
    {
        name: "Boxing",
        calFactor: 5.72
    },
    {
        name: "Calisthenics",
        calFactor: 3.81
    },
    {
        name: "Chopping Wood",
        calFactor: 2.85
    },
    {
        name: "Cross Country Skiing (High Effort)",
        calFactor: 6.67
    },
    {
        name: "Cross Country Skiing (Moderate Effort)",
        calFactor: 3.81
    },
    {
        name: "Downhill Skiing (High Effort)",
        calFactor: 3.81
    },
    {
        name: "Downhill Skiing (Moderate Effort)",
        calFactor: 2.62
    },
    {
        name: "Fooball (Touch/Two Hand)",
        calFactor: 3.81
    },
    {
        name: "Football (Full Contact)",
        calFactor: 4.28
    },
    {
        name: "Gardening",
        calFactor: 1.91
    },
    {
        name: "Golf",
        calFactor: 2.15
    },
    {
        name: "Hiking",
        calFactor: 2.85
    },
    {
        name: "Horseback Riding",
        calFactor: 1.91
    },
    {
        name: "Hockey",
        calFactor: 3.81
    },
    {
        name: "Jogging",
        calFactor: 3.3
    },
    {
        name: "Jumproping (High Effort)",
        calFactor: 5.72
    },
    {
        name: "Jumproping (Moderate Effort)",
        calFactor: 4.23
    },
    {
        name: "Lacrosse",
        calFactor: 3.81
    },
    {
        name: "Mowing the Lawn",
        calFactor: 2.62
    },
    {
        name: "Racquetball",
        calFactor: 4.05
    },
    {
        name: "Rock Climbing (Bouldering)",
        calFactor: 5.24
    },
    {
        name: "Rock Climbing (Rappelling)",
        calFactor: 3.81
    },
    {
        name: "Rollerskating",
        calFactor: 3.33
    },
    {
        name: "Rowing (High Effort)",
        calFactor: 5.72
    },
    {
        name: "Rowing (Moderate Effort)",
        calFactor: 3.33
    },
    {
        name: "Rugby",
        calFactor: 4.76
    },
    {
        name: "Running (High Effort)",
        calFactor: 8.08
    },
    {
        name: "Running (Light Effort)",
        calFactor: 4.28
    },
    {
        name: "Running (Moderate Effort)",
        calFactor: 6.01
    },
    {
        name: "Skateboarding",
        calFactor: 2.38
    },
    {
        name: "Soccer",
        calFactor: 4.76
    },
    {
        name: "Swimming Laps (High Effort)",
        calFactor: 4.76
    },
    {
        name: "Swimming Laps (Moderate Effort)",
        calFactor: 3.33
    },
    {
        name: "Tennis",
        calFactor: 3.33
    },
    {
        name: "Ultimate Frisbee",
        calFactor: 3.81
    },
    {
        name: "Unicycling",
        calFactor: 2.38
    },
    {
        name: "Volleyball",
        calFactor: 3.81
    },
    {
        name: "Walking",
        calFactor: 2.38
    },
    {
        name: "Weightlifting",
        calFactor: 2.85
    }
];

activities.forEach(function(activity){
    models.Activity.create({
        name: activity.name,
        calFactor: activity.calFactor
    });
});





// SAMPLE CALCULATION

// var myTargetCals = 2100;
// var myWeight = 155;
// var calsOverTarget = Math.round(Math.random()*1000);
//
// function suggestActivity (target, over) {
//   var randomActivity = activities[Math.floor(Math.random()*44)];
//   var myCalsPerHour = randomActivity.calFactor * myWeight;
//   var myCalsPerMinute = myCalsPerHour / 60;
//   var activityDuration = calsOverTarget / myCalsPerMinute;
//   var suggestionMessage = "In order to burn those " + calsOverTarget + " calories, we suggest " +
//     randomActivity.name + " for " + Math.round(activityDuration) + " minutes."
//
//   return suggestionMessage;
// }

// console.log(suggestActivity(myTargetCals, calsOverTarget));

mongoose.connection.close();
