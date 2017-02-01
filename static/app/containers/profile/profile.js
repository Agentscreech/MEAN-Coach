angular.module('App')
.component('profileComp', {
  templateUrl: 'app/containers/profile/profile.html',
  controller: ProfileCompCtrl,
  controllerAs: 'profileComp'
});


function ProfileCompCtrl($scope, $state, $stateParams, $window, Profile, Auth, Activity, $http, $interval) {

  var currentUser = Auth.currentUser();
  if ($stateParams.id !== currentUser.id) {
    $window.location.href='/profile/' + currentUser.id;
  }
  // console.log("Current User; ", Auth.currentUser());
    $scope.profile = Auth.currentUser();
    // console.log("THIS IS SCOPE. PROFILE ", $scope.profile.id);

    $scope.currentCals = 0;

//Return all activities
  $scope.findActivities = function(activity) {
    Activity.getActivities().then(function(activity) {
      console.log(activity);
    });
};

}

ProfileCompCtrl.$inject = ['$scope', '$state', '$stateParams', '$window', 'Profile', 'Auth', 'Activity', '$http', '$interval'];
