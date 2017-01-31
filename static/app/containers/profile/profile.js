angular.module('App')
.component('profileComp', {
  templateUrl: 'app/containers/profile/profile.html',
  controller: ProfileCompCtrl,
  controllerAs: 'profileComp'
});

function ProfileCompCtrl($scope, $state, $stateParams, $window, Profile, Auth, $http, $interval) {
  var currentUser = Auth.currentUser();
  if ($stateParams.id !== currentUser.id) {
    $window.location.href='/profile/' + currentUser.id;
  }
  console.log("Current User; ", Auth.currentUser());
    $scope.profile = Auth.currentUser();
    console.log("THIS IS SCOPE. PROFILE ", $scope.profile);

  $scope.currentCals = 0;
  $scope.searchResults = [];
  $scope.chosenFoods = [];
  $scope.searchTerm = "";
  $scope.savedMeal = [];
  $scope.savedMealDate = "";


  //Delay search for 1 second after done typing
  var interval = 1000;

  $scope.delayBeforeSearch = function() {
    $interval.cancel(interval);
    interval = $interval(function() {
      $scope.findFoods();
      $interval.cancel(interval);
    }, 1000);
  };


  // Return list of available foods based on search term
  $scope.findFoods = function() {
    var req = {
      url: '/foodresults?searchTerm=' + $scope.searchTerm,
      method: 'GET'
    };

    $http(req).then(function success(res) {
      $scope.searchResults = res.data.list.item;
    }, function failure(res) {
      console.log('failed');
    });
  };


  // Select one of the foods from the search results to retrieve calorie info
  $scope.addFood = function($event) {

    $scope.searchResults = [];
    $scope.searchTerm = "";

  	var foodID = event.target.id;
    var req = {
      url: '/addfood?foodId=' + foodID,
      method: 'GET'
    }

    $http(req).then(function success(res) {
      $scope.chosen = res.data.report;
      $scope.chosenFoods.push({name: $scope.chosen.food.name, kCals: $scope.chosen.food.nutrients[1].value});
    }, function failure(res) {
      console.log('failed');
    });
  };


  // Add food to your log
  $scope.saveFood = function($event) {
    $scope.savedMeal = $scope.chosenFoods;
    $scope.savedMealDate = new Date();
    console.log($scope.savedMeal);
  };

}


ProfileCompCtrl.$inject = ['$scope', '$state', '$stateParams', '$window', 'Profile', 'Auth', '$http', '$interval'];
