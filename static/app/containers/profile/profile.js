angular.module('App')
.component('profileComp', {
  templateUrl: 'app/containers/profile/profile.html',
  controller: ProfileCompCtrl,
  controllerAs: 'profileComp'
});

function ProfileCompCtrl($scope, $state, Auth, $http, $window) {
  $scope.isLoggedIn = function() {
    return Auth.isLoggedIn();
  }

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


ProfileCompCtrl.$inject = ['$scope', '$state', 'Auth', '$http', '$window'];