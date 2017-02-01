angular
  .module("App")
  .component('navbarz', {
    templateUrl: 'app/components/navbar/navbar.html',
    controller:NavbarzCtrl,
    controllerAs: "vm",
    bindToController: true
  })
  function NavbarzCtrl($scope, $state, Auth) {
    var vm = this;
    $scope.isLoggedIn = function() {
         if(Auth.isLoggedIn()){
         $scope.navId = Auth.currentUser().id;
         }
         return Auth.isLoggedIn();
     };

    $scope.logout = function() {
      Auth.removeToken();
      $state.go('loginState');
    }
    vm.$onInit = function() {
      vm.currentNavItem = "/home"
    }
  }
  NavbarzCtrl.$inject = ['$scope', '$state', 'Auth'];
