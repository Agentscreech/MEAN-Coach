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
  $scope.currentCals = 0;
  $scope.chosenFood = undefined;


  // Return list of available foods based on search term
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


  // Select one of the foods from the search results to retrieve calorie info
  $scope.addFood = function($event) {

  	var foodID = event.target.id;
    var req = {
      url: '/addfood?foodId=' + foodID,
      method: 'GET'
    }

    $http(req).then(function success(res) {
      $scope.chosen = res.data.report;
      $scope.chosenFood = $scope.chosen.food.name;
    }, function failure(res) {
      console.log('failed');
    });
  };


  // Add food to your log
  $scope.saveFood = function($event) {
    $scope.currentCals += parseInt($scope.chosen.food.nutrients[1].value);
    $scope.chosenFood = undefined;
  };

}


ProfileCompCtrl.$inject = ['$scope', '$state', '$stateParams', '$window', 'Profile', 'Auth', '$http'];
