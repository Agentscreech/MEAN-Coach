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
            $("#current-cals-num").css("color", "#F43B37");
            $("#cal-fill").css({"background-color": "#F43B37", "height": "100%"});
        }
        else if (calPercent >= 80 && calPercent < 100) {
            $("#current-cals-num").css("color", "#ff9803");
            $("#cal-fill").css({"background-color": "#ff9803", "height": calPercent + "%"});
            $("#current-cals").css("background-color", "#f9e5af");
        }
        else {
            $("#current-cals-num").css("color", "#00CA6A");
            $("#cal-fill").css({"background-color": "#00CA6A", "height": calPercent + "%"});
            $("#current-cals").css("background-color", "#bcffdb")
        }

    }, function error(data){
        console.log(data);
    });


}

ProfileCompCtrl.$inject = ['$scope','$stateParams', '$window', 'Profile', 'Auth', 'User', 'Activity'];
