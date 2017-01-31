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
  	var APIkey = 'voDReYpFIe0hJoOxgqqfGU28oUAf3Yp1HbsfOGEg';
  	var foodID = 11090;

    var req = {
      url: '/usda',
      method: 'GET'
    }

    $http(req).then(function success(res) {
      console.log(res.data.report.food.name);
      $scope.result = res.data.report.food.name;
    }, function failure(res) {
      console.log('failed');
    });
  };
}


ProfileCompCtrl.$inject = ['$scope', '$state', 'Auth', '$http', '$window'];