angular.module('App')
    .component('profileComp', {
        templateUrl: 'app/containers/profile/profile.html',
        controller: ProfileCompCtrl,
        controllerAs: 'profileComp'
    });


function ProfileCompCtrl($stateParams, $window, Profile, Auth) {
    var todaysLogs = {};
    var profileComp = this;
    var today = moment().format('MMMM Do YYYY');

    var currentUser = Auth.currentUser();
    var user_id = currentUser.id;
    if ($stateParams.id !== currentUser.id) {
        $window.location.href = '/profile/' + currentUser.id;
    }

    profileComp.currentCals = 0;
    profileComp.foods = [];
    profileComp.activities = [];
    Profile.getLogs(user_id).then(function(res){
        var logs = res.data;
        logs.forEach(function(log){
            if(log.date == today){
                log.foods.forEach(function (food){
                    profileComp.foods.push(food);
                    profileComp.currentCals += food.kcals;
                });
                log.activities.forEach(function(activity){
                    profileComp.activities.push(activity);
                    profileComp.currentCals -= activity.caloriesBurned;

                });
        }
    });
        console.log('to foods component', profileComp.foods);
        console.log('to activities component',profileComp.activities);
    });
    // console.log("Current User; ", Auth.currentUser());
    profileComp.profile = Auth.currentUser();
    // console.log("THIS IS SCOPE. PROFILE ", profileComp.profile.id);


    //trying to get the logs for the day
    // console.log(todaysLogs);


}

ProfileCompCtrl.$inject = ['$stateParams', '$window', 'Profile', 'Auth'];
