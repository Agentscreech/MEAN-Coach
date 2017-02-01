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
  $scope.chosenFoods = [];
  $scope.chosenFoodMeasures = [];
  $scope.mealList = {time: "", foods: []};
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
    if ($scope.searchTerm !== undefined && $scope.searchTerm !== "") {
      var req = {
        url: '/foodresults?searchTerm=' + $scope.searchTerm,
        method: 'GET'
      };

      $http(req).then(function success(res) {
        if (res.data.list === undefined) {
          $scope.searchResults = null;
        } 
        else {
          $scope.searchResults = res.data.list.item;
        }
      }, function failure(res) {
        console.log('failed');
      });
    }
    else {
      $scope.searchResults = undefined;
    }
    return $scope.searchResults;
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

      var nutrients = $scope.chosen.food.nutrients;
      for (var i = 0; i < nutrients.length; i++) {
        if (nutrients[i].name == "Energy") {
          $scope.chosenFoodMeasures = $scope.chosen.food.nutrients[i].measures;
        }
      };

      $scope.chosenFoodName = $scope.chosen.food.name;

    }, function failure(res) {
      console.log('failed');
    });
  };

  $scope.addFood = function($event) {
    var qtyCals = parseInt(event.target.id);
    $scope.mealList.foods.push({name: $scope.chosenFoodName, kCals: qtyCals});
    $scope.chosenFoodName = "";
    $scope.chosenFoods = [];
    document.querySelector('#currentChosenFood').remove();
    $scope.searchTerm = undefined;
  };

  // Add food to your log
  $scope.saveFood = function() {

    // Get timestamp
    var date = new Date();
    var time = date.getHours() + ":" + date.getMinutes();

    $scope.mealList.time = time;
    $scope.savedMeals.push($scope.mealList);
    console.log($scope.savedMeals);
    $scope.mealList = {time: "", foods: []};
    $scope.chosenFoods = [];
  };

  // Remove food from Add meal list
  $scope.remove = function() {
    document.querySelector('#currentChosenFood').remove();
    $scope.chosenFoods.pop();
  };

  $scope.removeChosenFood = function() {
    document.querySelector('#savedFood').remove();
    $scope.mealList.foods.pop();
  }


//Return all activities
  $scope.findActivities = function(activity) {
    Activity.getActivities().then(function(activity) {
      console.log(activity);
    });
  }

}

ProfileCompCtrl.$inject = ['$scope', '$state', '$stateParams', '$window', 'Profile', 'Auth', 'Activity', '$http', '$interval'];
