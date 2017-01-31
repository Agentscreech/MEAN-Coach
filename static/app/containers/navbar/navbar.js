angular.module('App')
.component('navbarComp', {
  templateUrl: 'app/containers/navbar/navbar.html',
  controller: NavBarCompCtrl,
  controllerAs: 'navbarComp'
});

function NavBarCompCtrl($state, Auth) {
  var NavBarCompCtrl = this;
  NavBarCompCtrl.isLoggedIn = function() {
  // Auth.isLoggedIn();
  console.log("In navbar ctrl:", Auth.isLoggedIn());
  }

  NavBarCompCtrl.logout = function() {
    Auth.removeToken();
    $state.go('login');
  };
}
HomeCompCtrl.$inject = ['$scope', '$state', 'Auth'];
