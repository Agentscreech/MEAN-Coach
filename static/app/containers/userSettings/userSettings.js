angular.module('App')
    .component('userSettingsComp', {
        templateUrl: 'app/containers/userSettings/userSettings.html',
        controller: UserSettingsCompCtrl,
        controllerAs: 'userSettingsComp'
    });

function UserSettingsCompCtrl($state, $stateParams, $window, $resource, $location, Auth, User) {
    var currentUser = Auth.currentUser();
    if ($stateParams.id !== currentUser.id) {
        $window.location.href = '/profile/' + currentUser.id;
    }
    var userSettingsComp = this;
    userSettingsComp.user = $stateParams.id;
    userSettingsComp.isMetric = false;
    userSettingsComp.weight = null;
    userSettingsComp.height = null;
    userSettingsComp.age = null;
    userSettingsComp.gender = 'male';
    userSettingsComp.goal = null;
    userSettingsComp.bmr = false;

    userSettingsComp.calcBMR = function(weight, height, age, gender) {
        console.log('trying to calculate');
        if (!userSettingsComp.isMetric) {
            weight = weight * 0.4536;
            height = height * 2.54;
        }
        if (gender == 'Male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else if (gender == 'Female') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        } else {
            error = "gender not defined";
            return error;
        }
        // console.log(bmr);
        bmr = Math.round(bmr, 1);
        userSettingsComp.bmr = bmr;
        // return bmr;
    };
    //need to right a service to update use
    userSettingsComp.updateUser = function() {
        userSettingsComp.settings = {
            user_id: userSettingsComp.user,
            weight: userSettingsComp.weight,
            height: userSettingsComp.height,
            age: userSettingsComp.age,
            gender: userSettingsComp.gender,
            goal: userSettingsComp.goal
        };
        if (!userSettingsComp.isMetric) {
            userSettingsComp.settings.weight = userSettingsComp.settings.weight  * 0.4536;
            userSettingsComp.settings.height = userSettingsComp.settings.height * 2.54;
        }
        console.log('trying to send', userSettingsComp.settings);
        User.update(userSettingsComp.settings, function success(data) {
            $location.path('/profile/' + currentUser.id);
        }, function error(data) {
            console.log('error', data);
        });

    };
}

UserSettingsCompCtrl.$inject = ['$state', '$stateParams', '$window', '$resource', '$location', 'Auth', 'User'];
