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

  $scope.results = [];
  $scope.currentCals= 0;

  $scope.findFoods = function() {
    var searchTerm = 'raw broccoli';
    var req = {
      url: '/foodresults?searchTerm=' + searchTerm,
      method: 'GET'
    }

    $http(req).then(function success(res) {
      $scope.results = res.data.list.item;
    }, function failure(res) {
      console.log('failed');
    });
  };

  $scope.addFood = function() {
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
