angular
    .module("App")
    .component('activities', {
        templateUrl: 'app/components/activities/activities.html',
        controller: ActivityCtrl,
        controllerAs: "activity",
        // bindToController: true
    });

function ActivityCtrl($scope, Activity, ActivitySearch, Auth, User){
  $scope.activitySearchTerm = undefined;
  $scope.activitySearchResults = [];
  // var activity = this;
  $scope.userWeight = null;

  $scope.$watch('computedCalories', function(newVal, oldVal) {
    console.log('New Value', newVal);
    console.log('Old Value', oldVal);
  });

  //Return all activities
  $scope.findActivities = function(activity) {
    $scope.allActivitiesClicked = !$scope.allActivitiesClicked;
    Activity.getActivities().then(function(activity) {
      $scope.allActivities = activity.data;
    });
  }

  //Return currentUser weight to calculate respective calories per activity
  $scope.findWeight = function() {
    $scope.currentUser = Auth.currentUser();
    User.get({id: $scope.currentUser.id }, function success(user) {
      $scope.userWeight = user.weight;
    })
  }



  //Return activity based on user search term
  $scope.searchActivities = function(activity) {
    $scope.findWeight()
    if ($scope.activitySearchTerm !== undefined) {
      var serviceActivitySearch = $scope.activitySearchTerm;
      ActivitySearch.search(serviceActivitySearch).then(function(activity) {
        $scope.activitySearchResults = activity.data;
        for(var i = 0; i < $scope.activitySearchResults.length; i++){
          $scope.activitySearchResults[i].calFactor = Math.round($scope.activitySearchResults[i].calFactor * $scope.userWeight);
        }
        console.log("Computed calories array: ", $scope.activitySearchResults);
      });
    }
  }
}

ActivityCtrl.$inject = ['$scope', 'Activity', 'ActivitySearch', 'Auth', 'User'];
