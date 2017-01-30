angular.module('App')
.component('profileComp', {
  templateUrl: 'app/containers/profile/profile.html',
  controller: ProfileCompCtrl,
  controllerAs: 'profileComp'
});

function ProfileCompCtrl($scope, $state, Auth) {
  $scope.isLoggedIn = function() {
    return Auth.isLoggedIn();
  }
}

ProfileCompCtrl.$inject = ['$scope', '$state', 'Auth'];
