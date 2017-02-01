angular.module('App')
    .component('profileComp', {
        templateUrl: 'app/containers/profile/profile.html',
        controller: ProfileCompCtrl,
        controllerAs: 'profileComp'
    });

function ProfileCompCtrl($scope, $state, $stateParams, $window, Profile, Auth, Activity, $http, $interval) {

    var currentUser = Auth.currentUser();
    if ($stateParams.id !== currentUser.id) {
        $window.location.href = '/profile/' + currentUser.id;
    }
    // console.log("Current User; ", Auth.currentUser());
    $scope.profile = Auth.currentUser();
    // console.log("THIS IS SCOPE. PROFILE ", $scope.profile.id);

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

    $scope.currentCals = 0;

}

ProfileCompCtrl.$inject = ['$scope', '$state', '$stateParams', '$window', 'Profile', 'Auth', 'Activity', '$http', '$interval'];
