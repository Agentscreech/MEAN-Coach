angular
    .module("App")
    .component('activities', {
        templateUrl: 'app/components/activities/activities.html',
        controller: ActivityCtrl,
        controllerAs: "activity",
        // bindToController: true
    });

function ActivityCtrl(){
    var activity = this;
}



ActivityCtrl.$inject = [];
