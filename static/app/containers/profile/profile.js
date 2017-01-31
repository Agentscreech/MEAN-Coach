angular.module('App')
.component('profileComp', {
  templateUrl: 'app/containers/profile/profile.html',
  controller: ProfileCompCtrl,
  controllerAs: 'profileComp'
});

function ProfileCompCtrl($scope, $state, $stateParams, $window, Profile, Auth, $http) {
  var currentUser = Auth.currentUser();
  if ($stateParams.id !== currentUser.id) {
    $window.location.href='/profile/' + currentUser.id;
  }
  console.log("Current User; ", Auth.currentUser());
    $scope.profile = Auth.currentUser();
    console.log("THIS IS SCOPE. PROFILE ", $scope.profile.id);

  $scope.foodSearch = function() {
  	var foodID = 11090;
    var req = {
      url: '/usda?foodId=' + foodID,
      method: 'GET'
    }

    $http(req).then(function success(res) {
      $scope.result = res.data.report;
    }, function failure(res) {
      console.log('failed');
    });
  };
}


ProfileCompCtrl.$inject = ['$scope', '$state', '$stateParams', '$window', 'Profile', 'Auth', '$http'];
