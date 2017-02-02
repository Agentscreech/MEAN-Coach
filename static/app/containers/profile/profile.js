angular.module('App')
    .component('profileComp', {
        templateUrl: 'app/containers/profile/profile.html',
        controller: ProfileCompCtrl,
        controllerAs: 'profileComp'
    });


function ProfileCompCtrl($scope, $stateParams, $window, Profile, Auth, Log) {
    var todaysLogs = {};
    var profileComp = this;
    var today = moment().format('MMMM Do YYYY');

    var currentUser = Auth.currentUser();
    var user_id = currentUser.id;
    if ($stateParams.id !== currentUser.id) {
        $window.location.href = '/profile/' + currentUser.id;
    }
    profileComp.foods = [];
    profileComp.activities = [];
    Profile.getLogs(user_id).then(function(res){
        var logs = res.data;
        logs.forEach(function(log){
            if(log.date == today){
                log.foods.forEach(function (food){
                    profileComp.foods.push(food);
                });
                log.activities.forEach(function(activity){
                    profileComp.activities.push(activity);
                });
        }
    });
        console.log('to foods component', profileComp.foods);
        console.log('to activities component',profileComp.activities);
    });
    // console.log("Current User; ", Auth.currentUser());
    $scope.profile = Auth.currentUser();
    // console.log("THIS IS SCOPE. PROFILE ", $scope.profile.id);

    $scope.currentCals = 0;

    //trying to get the logs for the day
    // console.log(todaysLogs);


}

ProfileCompCtrl.$inject = ['$scope', '$stateParams', '$window', 'Profile', 'Auth', 'Log'];
