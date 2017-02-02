angular
    .module("App")
    .component('navbarz', {
        templateUrl: 'app/components/navbar/navbar.html',
        controller: NavbarzCtrl,
        controllerAs: "vm",
        bindToController: true
    });

function NavbarzCtrl($scope, $state, Auth, $window) {
    var vm = this;
    // vm.bool = Auth.isLoggedIn();
    $scope.isLoggedIn = function() {
          if(Auth.isLoggedIn()){
          $scope.navId = Auth.currentUser().id;         }
         return Auth.isLoggedIn();
    };
    // // vm.id = Auth.currentUser().id;
    // vm.isLoggedIn = function(){
    //     vm.bool = Auth.isLoggedIn();
    //     vm.id = Auth.currentUser().id;
    //     return vm.bool ;
    // };
    // console.log(vm.bool);
    // console.log("This is nav current user: ", vm.id);
    // vm.goProfile = function(){
    //     console.log('trying to go to profile');
    //     if (vm.bool){
    //         vm.id = Auth.currentUser().id;
    //         $state.go('profileState', {id: vm.id});
    //     }
    // };



    $scope.logout = function() {
        Auth.removeToken();
        vm.isLoggedIn = false;
        $state.go('loginState');
    };
    vm.$onInit = function() {
        vm.currentNavItem = "/home";
    };
}
NavbarzCtrl.$inject = ['$scope', '$state', 'Auth', "$window"];
