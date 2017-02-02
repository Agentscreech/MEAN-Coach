angular
    .module("App")
    .component('navbarz', {
        templateUrl: 'app/components/navbar/navbar.html',
        controller: NavbarzCtrl,
        controllerAs: "vm",
        bindToController: true
    });

function NavbarzCtrl($scope, $state, Auth) {
    var vm = this;
    vm.isLoggedIn = Auth.isLoggedIn();
    console.log(vm.isLoggedIn);
     if (vm.isLoggedIn){
         vm.id = Auth.currentUser().id;
         console.log("This is nav current user: ", vm.id);
     }



    $scope.logout = function() {
        Auth.removeToken();
        vm.isLoggedIn = false;
        $state.go('loginState');
    };
    vm.$onInit = function() {
        vm.currentNavItem = "/home";
    };
}
NavbarzCtrl.$inject = ['$scope', '$state', 'Auth'];
