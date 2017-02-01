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
  console.log("Current User; ", Auth.currentUser());
    $scope.profile = Auth.currentUser();
    console.log("THIS IS SCOPE. PROFILE ", $scope.profile.id);

  $scope.currentCals = 0;
  $scope.searchTerm = undefined;
  $scope.searchResults = [];
  $scope.chosenFoods = [];
  $scope.chosenFoodMeasures = [];
  $scope.mealList = [];
  $scope.measureQty = 1;
  $scope.savedMeals = [];
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
    if ($scope.searchTerm !== undefined) {
      var req = {
        url: '/foodresults?searchTerm=' + $scope.searchTerm,
        method: 'GET'
      };

      $http(req).then(function success(res) {
        $scope.searchResults = res.data.list.item;
      }, function failure(res) {
        console.log('failed');
      });
    }
  };


  // Select one of the foods from the search results to retrieve calorie info
  $scope.chooseFood = function($event) {

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
      $scope.chosenFoodMeasures = $scope.chosen.food.nutrients[1].measures;
      $scope.chosenFoodName = $scope.chosen.food.name;
      console.log($scope.chosenFoodMeasures);
    }, function failure(res) {
      console.log('failed');
    });
  };

  $scope.addFood = function($event) {
    var qtyCals = parseInt(event.target.id);
    $scope.mealList.push({name: $scope.chosenFoodName, kCals: qtyCals});
    $scope.chosenFoodName = "";
    $scope.chosenFoods = [];
    document.querySelector('#currentChosenFood').remove();
    $scope.searchTerm = undefined;
  };

  // Add food to your log
  $scope.saveFood = function($event) {
    $scope.savedMeals.push($scope.mealList);
    console.log($scope.savedMeals);
    $scope.mealList = [];
    $scope.chosenFoods = [];
  };

  // Remove food from Add meal list
  $scope.remove = function($event) {
    document.querySelector('#currentChosenFood').remove();
    $scope.chosenFoods.pop();
  };

//Return all activities
  $scope.findActivities = function(activity) {
    Activity.getActivities().then(function(activity) {
      console.log(activity);
    });
  }
}

ProfileCompCtrl.$inject = ['$scope', '$state', '$stateParams', '$window', 'Profile', 'Auth', 'Activity', '$http', '$interval'];
