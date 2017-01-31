angular
  .module("App")
  .component('navbarz', {
    templateUrl: 'app/components/navbar/navbar.html',
    controller: function($scope, $state, Auth) {
      var vm = this;
      $scope.isLoggedIn = function() {
        console.log("NavBar: ", $scope.isLoggedIn);
        return Auth.isLoggedIn()
      }

      $scope.logout = function() {
        Auth.removeToken();
        $state.go('loginState');
      }
      vm.$onInit = function() {
        vm.currentNavItem = "/home"
      }
    },
    controllerAs: "vm",
    bindToController: true
  });
