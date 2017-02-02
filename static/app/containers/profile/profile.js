angular.module('App')
    .component('profileComp', {
        templateUrl: 'app/containers/profile/profile.html',
        controller: ProfileCompCtrl,
        controllerAs: 'profileComp'
    });


function ProfileCompCtrl($scope,$stateParams, $window, Profile, Auth, User) {
    var todaysLogs = {};
    var profileComp = this;
    var today = moment().format('MMMM Do YYYY');
    profileComp.profile = Auth.currentUser();
    var user_id = profileComp.profile.id;
    if ($stateParams.id !== profileComp.profile.id) {
        $window.location.href = '/profile/' + profileComp.profile.id;
    }
    profileComp.currentCals = 0;
    profileComp.goal = 0;
    $scope.$watch('profileComp.currentCals', function(newVal, oldVal){
        if(profileComp.currentCals && profileComp.goal){
            if (profileComp.currentCal > profileComp.goal){
                var over = profileComp.currentCals - profileComp.goal;
                console.log('over by ', over);
            } else if (profileComp.currentCal < profileComp.goal){
                console.log('not over,', profileComp.currentCals);
            } else {
                console.log('¯\\_(ツ)_/¯');
            }
        }
    });
    $scope.$watch('profileComp.goal', function(newVal, oldVal){
        if(profileComp.currentCals && profileComp.goal){
            if (profileComp.currentCal > profileComp.goal){
                var over = profileComp.currentCals - profileComp.goal;
                console.log('over by ', over);
            } else if (profileComp.currentCal < profileComp.goal){
                console.log('not over,', profileComp.currentCals);
            } else {
                console.log('¯\\_(ツ)_/¯');
            }
        }
    });

    profileComp.foods = [];
    profileComp.activities = [];
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
        // console.log('to foods component', profileComp.foods);
        // console.log('to activities component', profileComp.activities);
    });

    User.get({id: profileComp.profile.id}, function success(userData){
        console.log('this is user goal', userData.goal);
        profileComp.goal = userData.goal;
        // if (profileComp.currentCal > profileComp.goal){
        //     var over = profileComp.currentCals - profileComp.goal;
        //     console.log('over by ', over);
        // } else if (profileComp.currentCal < profileComp.goal){
        //     console.log('not over,', profileComp.currentCals);
        // } else {
        //     console.log('¯\\_(ツ)_/¯');
        // }
    }, function error(data){
        console.log(data);
    });


}

ProfileCompCtrl.$inject = ['$scope','$stateParams', '$window', 'Profile', 'Auth', 'User'];
