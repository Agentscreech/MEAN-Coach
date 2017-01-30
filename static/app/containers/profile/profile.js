angular.module('App')
.component('profileComp', {
  templateUrl: 'app/containers/profile/profile.html',
  controller: ProfileCompCtrl,
  controllerAs: 'profileComp'
});

function ProfileCompCtrl($scope, $stateParams, Profile) {
  $scope.profile = {};

  //This is chained off of the call to the factory
  Profile.getProfile($stateParams.id).then(function success(res){
    console.log("YOUR PROFILE: ", res);
    $scope.profile = {
      email: res.data.email,
      id: res.data.id
    }
    console.log("$SCOPE.PROFILE: ", $scope.profile);
  }, function error(res){
    console.log(res);
  })
}

ProfileCompCtrl.$inject = ['$scope', '$stateParams', 'Profile'];
