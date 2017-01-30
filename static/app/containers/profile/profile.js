angular.module('App')
.component('profileComp', {
  templateUrl: 'app/containers/profile/profile.html',
  controller: ProfileCompCtrl,
  controllerAs: 'profileComp'
});

function ProfileCompCtrl($scope, $state, Auth, $http, $window) {
  $scope.isLoggedIn = function() {
    return Auth.isLoggedIn();
  }

  $scope.foodSearch = function() {
    var req = {
      url: 'http://api.nal.usda.gov/ndb/reports/?ndbno=01009&type=b&format=json&api_key=voDReYpFIe0hJoOxgqqfGU28oUAf3Yp1HbsfOGEg',
      method: "GET"
    }
    console.log("request: ", req);
    // $window.location.href = req.url;

    $http(req).then(function success(res) {
    	console.log("response: ", res.data);
    //   if (res.data.Error === "Movie not found!") {
    //     $scope.results = [];
    //   } else {
    //     $scope.results = res.data.data;
    //   }
    // }, function failure(res) {
    //   $scope.results = [];
    });

  };
}


ProfileCompCtrl.$inject = ['$scope', '$state', 'Auth', '$http', '$window'];
