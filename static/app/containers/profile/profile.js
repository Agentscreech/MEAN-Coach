angular.module('App')
    .component('profileComp', {
        templateUrl: 'app/containers/profile/profile.html',
        controller: ProfileCompCtrl,
        controllerAs: 'profileComp'
    });


function ProfileCompCtrl($scope,$stateParams, $window, Profile, Auth, User, Activity) {
    var profileComp = this;
    var today = moment().format('MMMM Do YYYY');
    profileComp.today = today;
    profileComp.profile = Auth.currentUser();
    var user_id = profileComp.profile.id;
    if ($stateParams.id !== profileComp.profile.id) {
        $window.location.href = '/profile/' + profileComp.profile.id;
    }
    profileComp.currentCals = 0;
    $scope.$watch('profileComp.currentCals',function(newVal, oldVal){
        if(profileComp.currentCals && profileComp.goal) {
            if (profileComp.currentCals > profileComp.goal){
                profileComp.isOver = true;
                profileComp.overBy = profileComp.currentCals - profileComp.goal;
                console.log('over by ', profileComp.overBy);
                Activity.getActivities().then(function(list){
                    var actv = list.data[Math.floor(Math.random()*list.data.length)];
                    console.log('Activity chosen', actv);
                    profileComp.suggestion = actv.name;
                    profileComp.duration = Math.round(profileComp.overBy /(actv.calFactor * 60)*60);
                    console.log('length of thing', profileComp.duration);
                });
            } else if (profileComp.currentCals < profileComp.goal){
                console.log('not over,', profileComp.currentCals);
                    profileComp.isOver = false;
            } else {
                console.log('¯\\_(ツ)_/¯');
            }
        }
        var calPercent = (profileComp.currentCals / profileComp.goal).toFixed(3) * 100;
        if (calPercent > 100) {
            $("#current-cals-num").css("color", "#fd0332");
            $("#cal-fill").css({"background-color": "#fd0332", "height": "100%"});
            // profileComp.isOver = true;
        }
        else if (calPercent >= 80 && calPercent < 100) {
            $("#current-cals-num").css("color", "#ff9803");
            $("#cal-fill").css({"background-color": "#ff9803", "height": calPercent + "%"});
            $("#current-cals").css("background-color", "rgba(255,152,3,.3)");
            //  profileComp.isOver = false;
        }
        else {
            $("#current-cals-num").css("color", "#00CA6A");
            $("#cal-fill").css({"background-color": "#00CA6A", "height": calPercent + "%"});
            $("#current-cals").css("background-color", "rgba(0,202,106,.25)");
            // profileComp.isOver = false;
        }
    });
    profileComp.goal = 0;
    profileComp.foods = [];
    profileComp.isOver = false;
    profileComp.overBy = null;
    profileComp.activities = [];
    profileComp.suggestion = '';
    profileComp.duration = null;
    Profile.getLogs(user_id).then(function(res) {
        var logs = res.data;
        logs.forEach(function(log) {
            if (log.date == today) {
                log.foods.forEach(function(food) {
                    profileComp.foods.push(food);
                    profileComp.currentCals += food.kcals;
                });
                log.activities.forEach(function(activity) {
                    profileComp.activities.push(activity);
                    profileComp.currentCals -= activity.caloriesBurned;
                });
            }
        });
    });

    User.get({id: profileComp.profile.id}, function success(userData){
        console.log('this is user goal', userData.goal);
        profileComp.goal = userData.goal;
        if(profileComp.currentCals && profileComp.goal) {
            if (profileComp.currentCals > profileComp.goal){
                profileComp.isOver = true;
                profileComp.overBy = profileComp.currentCals - profileComp.goal;
                console.log('over by ', profileComp.overBy);
                Activity.getActivities().then(function(list){
                    var actv = list.data[Math.floor(Math.random()*list.data.length)];
                    console.log('Activity chosen', actv);
                    profileComp.suggestion = actv.name;
                    profileComp.duration = Math.round(profileComp.overBy /(actv.calFactor * 60)*60);
                    console.log('length of thing', profileComp.duration);
                });
            } else if (profileComp.currentCals < profileComp.goal){
                console.log('not over,', profileComp.currentCals);
            } else {
                console.log('¯\\_(ツ)_/¯');
            }
        }

        // Change color and height of calories fill ring based on total
        var calPercent = (profileComp.currentCals / profileComp.goal).toFixed(3) * 100;
        if (calPercent > 100) {
            $("#current-cals-num").css("color", "#fd0332");
            $("#cal-fill").css({"background-color": "#fd0332", "height": "100%"});
        }
        else if (calPercent >= 80 && calPercent < 100) {
            $("#current-cals-num").css("color", "#ff9803");
            $("#cal-fill").css({"background-color": "#ff9803", "height": calPercent + "%"});
            $("#current-cals").css("background-color", "rgba(255,152,3,.3)");
        }
        else {
            $("#current-cals-num").css("color", "#00CA6A");
            $("#cal-fill").css({"background-color": "#00CA6A", "height": calPercent + "%"});
            $("#current-cals").css("background-color", "rgba(0,202,106,.25)");
        }

    }, function error(data){
        console.log(data);
    });
// code for calendar
var currentTime = new Date();
profileComp.currentTime = currentTime;
profileComp.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
profileComp.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
profileComp.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
profileComp.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
profileComp.disable = [false, 1, 7];
// profileComp.today = 'Today';
profileComp.clear = 'Clear';
profileComp.close = 'Close';
var days = 365;
profileComp.minDate = (new Date(profileComp.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
profileComp.maxDate = (new Date(profileComp.currentTime.getTime())).toISOString();
profileComp.onClose = function () {
    today = moment(profileComp.currentTime).format('MMMM Do YYYY');
    console.log('onClose');
    profileComp.activities = [];
    profileComp.foods = [];
    profileComp.currentCals = 0;
    Profile.getLogs(user_id).then(function(res) {
        var logs = res.data;
        logs.forEach(function(log) {
            console.log('this is the day selected ', today);
            if (log.date == today) {
                log.foods.forEach(function(food) {
                    profileComp.foods.push(food);
                    profileComp.currentCals += food.kcals;
                });
                log.activities.forEach(function(activity) {
                    profileComp.activities.push(activity);
                    profileComp.currentCals -= activity.caloriesBurned;
                });
            }
        });
        console.log(profileComp.foods);
        console.log(profileComp.currentCals);
    });

    User.get({id: profileComp.profile.id}, function success(userData){
        console.log('this is user goal', userData.goal);
        profileComp.goal = userData.goal;
        if(profileComp.currentCals && profileComp.goal) {
            if (profileComp.currentCals > profileComp.goal){
                profileComp.isOver = true;
                profileComp.overBy = profileComp.currentCals - profileComp.goal;
                console.log('over by ', profileComp.overBy);
                Activity.getActivities().then(function(list){
                    var actv = list.data[Math.floor(Math.random()*list.data.length)];
                    console.log('Activity chosen', actv);
                    profileComp.suggestion = actv.name;
                    profileComp.duration = Math.round(profileComp.overBy /(actv.calFactor * 60)*60);
                    console.log('length of thing', profileComp.duration);
                });
            } else if (profileComp.currentCals < profileComp.goal){
                console.log('not over,', profileComp.currentCals);
            } else {
                console.log('¯\\_(ツ)_/¯');
            }
        }

        // Change color and height of calories fill ring based on total
        var calPercent = (profileComp.currentCals / profileComp.goal).toFixed(3) * 100;
        if (calPercent > 100) {
            $("#current-cals-num").css("color", "#fd0332");
            $("#cal-fill").css({"background-color": "#fd0332", "height": "100%"});
        }
        else if (calPercent >= 80 && calPercent < 100) {
            $("#current-cals-num").css("color", "#ff9803");
            $("#cal-fill").css({"background-color": "#ff9803", "height": calPercent + "%"});
            $("#current-cals").css("background-color", "rgba(255,152,3,.3)");
        }
        else {
            $("#current-cals-num").css("color", "#00CA6A");
            $("#cal-fill").css({"background-color": "#00CA6A", "height": calPercent + "%"});
            $("#current-cals").css("background-color", "rgba(0,202,106,.25)");
        }

    }, function error(data){
        console.log(data);
    });
};
// profileComp.onSet = function () {
//     console.log('onSet');
// };
// profileComp.onStop = function () {
//     console.log('onStop');
// };

}

ProfileCompCtrl.$inject = ['$scope','$stateParams', '$window', 'Profile', 'Auth', 'User', 'Activity'];
