angular
    .module("App")
    .component('activities', {
        templateUrl: 'app/components/activities/activities.html',
        controller: ActivityCtrl,
        controllerAs: "activity",
        // bindToController: true
    });

function ActivityCtrl($scope, Activity, ActivitySearch){
    $scope.activitySearchTerm = undefined;
    $scope.activitySearchResults = [];
    var activity = this;

    //Return all activities
      $scope.findActivities = function(activity) {
        Activity.getActivities().then(function(activity) {
          console.log("All activities: ", activity);
        });
      }

      //Return activity based on user search term
      $scope.searchActivities = function(activity) {
        if ($scope.activitySearchTerm !== undefined) {
            var serviceActivitySearch = $scope.activitySearchTerm;
        //console.log("Activity Search Term: ", serviceActivitySearch);
            ActivitySearch.search(serviceActivitySearch).then(function(activity) {
                $scope.activitySearchResults = activity.data;
                console.log("Partial match results...: ", $scope.activitySearchResults);
          });
        }
      }


}



ActivityCtrl.$inject = ['$scope', 'Activity', 'ActivitySearch'];
