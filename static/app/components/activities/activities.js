angular
    .module("App")
    .component('activities', {
        templateUrl: 'app/components/activities/activities.html',
        controller: ActivityCtrl,
        controllerAs: "activityComp",
        bindings: {
          activityList: '<'
        }
    });

function ActivityCtrl($window, Activity, ActivitySearch, Auth, User, Log, $interval, DeleteActivity){
  activityComp = this;

  var today = moment().format('MMMM Do YYYY');
  activityComp.allActivitiesClicked = true;
  activityComp.activitySearchTerm = undefined;
  activityComp.activityduration = 0;
  activityComp.activitySearchResults = [];
  activityComp.newActivity = {};
  // activityComp.loggedActivities = [];
  activityComp.userWeight = null;
  activityComp.clickSearchTerm = null;
  var deleteId = {
      user_id: Auth.currentUser().id,
      _id: null
    };

  var log = {
      user_id: Auth.currentUser().id,
      logs: {
          date: today,
          activities: []
      }
  };
  activityComp.loggedActivities = log.logs;

  //Delay search for 1 second after done typing
  var interval = 1000;
  activityComp.delayBeforeSearch = function() {
      $interval.cancel(interval);
      interval = $interval(function() {
          activityComp.searchActivities();
          $interval.cancel(interval);
          console.log(activityComp.activitySearchTerm);
      }, 1000);
  };

  //Return all activities
  activityComp.findActivities = function(activity) {
    activityComp.allActivitiesClicked = !activityComp.allActivitiesClicked;
    Activity.getActivities().then(function(activity) {
      activityComp.allActivities = activity.data;
    });
  };

  activityComp.clickSearch = function($event) {
    activityComp.clickSearchTerm = event.srcElement.innerText;
    activityComp.activitySearchTerm = activityComp.clickSearchTerm;
    console.log(activityComp.activitySearchTerm);
    activityComp.searchActivities();
  };

  //Return currentUser weight to calculate respective calories per activity
  activityComp.findWeight = function() {
    activityComp.currentUser = Auth.currentUser();
    User.get({id: activityComp.currentUser.id }, function success(user) {
      activityComp.userWeight = user.weight;
    });
  };

  //Return activity based on user search term
  activityComp.searchActivities = function(activity) {
    activityComp.activitySearchResults = [];
    activityComp.findWeight();
    if (activityComp.activitySearchTerm !== undefined && activityComp.activitySearchTerm !== "") {
      var serviceActivitySearch = activityComp.activitySearchTerm;
      ActivitySearch.search(serviceActivitySearch).then(function(activity) {
        activityComp.activitySearchResults = activity.data;
        for(var i = 0; i < activityComp.activitySearchResults.length; i++){
          activityComp.activitySearchResults[i].calFactor = Math.round(activityComp.activitySearchResults[i].calFactor * activityComp.userWeight);
        }
        console.log("Computed calories array: ", activityComp.activitySearchResults);
      });
    }
  };

  //Add activity to current user log
  activityComp.addActivity = function($index) {
    activityComp.newActivity = activityComp.activitySearchResults[$index];
    var userTimeFactor = activityComp.activityduration / 60;
    activityComp.newActivity.caloriesBurned = Math.round(activityComp.activitySearchResults[$index].calFactor * userTimeFactor);
    console.log(activityComp.newActivity);
    delete activityComp.activitySearchResults[$index].calFactor;
    delete activityComp.activitySearchResults[$index]._id;
    activityComp.loggedActivities.activities.push(activityComp.newActivity);
    console.log(activityComp.loggedActivities.activities);
    activityComp.searchActivities();
    console.log('trying to send ', log);
    Log.update(log, function success(data){
        $window.location.reload();
        console.log('success res', data);
    }, function error(data){
        console.log('error', data);
    });
  };

  //Delete activity from current user log
  activityComp.deleteActivity = function($index) {
    console.log("activity id: ", activityComp.activityList[$index]._id);
    deleteId._id = activityComp.activityList[$index]._id;
    deleteId.user_id = Auth.currentUser().id;
    console.log("Delete id: ", deleteId);
    DeleteActivity.delete(deleteId).then(function(res) {
      console.log("Activity deleted", res);
      $window.location.reload();
    }, function error(data) {
      console.log(data);
    });
  };

}

ActivityCtrl.$inject = ['$window','Activity', 'ActivitySearch', 'Auth', 'User', 'Log', '$interval', 'DeleteActivity'];
