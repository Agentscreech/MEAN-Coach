angular.module('App')
.component('navbarComp', {
  templateUrl: 'app/containers/navbar/navbar.html',
  controller: NavBarCompCtrl,
  controllerAs: 'navbarComp'
});

function NavBarCompCtrl($scope, $state, Auth) {
  $scope.isLoggedIn = function() {
    return Auth.isLoggedIn()
  };
  $scope.logout = function() {
    Auth.removeToken();
    $state.go('login');
  };
}
HomeCompCtrl.$inject = ['$scope', '$state', 'Auth'];
