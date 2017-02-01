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
  var activity = this;

  //Return all activities
  $scope.findActivities = function(activity) {
    Activity.getActivities().then(function(activity) {
      console.log("All activities: ", activity);
      });
    }

  //Return currentUser weight to calculate respective calories per activity
  $scope.findWeight = function() {
    $scope.currentUser = Auth.currentUser();
    console.log("Current user: ", $scope.currentUser.id);
    User.get({id: $scope.currentUser.id }, function success(user) {
      console.log("Got user weight: ", user);
    })
  }


  //Return activity based on user search term
  $scope.searchActivities = function(activity) {
    $scope.findWeight()
    if ($scope.activitySearchTerm !== undefined) {
      var serviceActivitySearch = $scope.activitySearchTerm;
      ActivitySearch.search(serviceActivitySearch).then(function(activity) {
        $scope.activitySearchResults = activity.data;
        console.log("Partial match results...: ", $scope.activitySearchResults);
      });
    }
  }
}

ActivityCtrl.$inject = ['$scope', 'Activity', 'ActivitySearch', 'Auth', 'User'];
