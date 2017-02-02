angular
    .module("App")
    .component('activities', {
        templateUrl: 'app/components/activities/activities.html',
        controller: ActivityCtrl,
        controllerAs: "activity",
    });

function ActivityCtrl($scope, Activity, ActivitySearch, Auth, User){
  $scope.activitySearchTerm = undefined;
  $scope.activity.duration;
  $scope.activitySearchResults = [];
  $scope.newActivity = {};
  $scope.loggedActivities = [];
  $scope.userWeight = null;

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

  //Add activity to current user log
  $scope.addActivity = function($index) {
    $scope.newActivity = $scope.activitySearchResults[$index];
    var userTimeFactor = $scope.activity.duration / 60;
    $scope.newActivity.caloriesBurned = Math.round($scope.activitySearchResults[$index].calFactor * userTimeFactor);
    delete $scope.activitySearchResults[$index].calFactor;
    delete $scope.activitySearchResults[$index]._id;
    $scope.loggedActivities.push($scope.newActivity);
    console.log($scope.loggedActivities);
    $scope.searchActivities();
    return $scope.loggedActivities;
  }

}

ActivityCtrl.$inject = ['$scope', 'Activity', 'ActivitySearch', 'Auth', 'User'];
