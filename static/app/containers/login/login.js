angular.module('App')
    .component('loginComp', {
        templateUrl: 'app/containers/login/login.html',
        controller: LoginCompCtrl,
        controllerAs: 'loginComp'
    });

function LoginCompCtrl($scope, $state, UserService) {
    $scope.user = {
        email: '',
        password: ''
    };
    $scope.userLogin = function() {
        UserService.login($scope.user);
        console.log("This is user logging in: ", $scope.user);
        //Redirect home on successful login
        $state.go('homeState');
    };
}

LoginCompCtrl.$inject = ['$scope', '$state', 'UserService'];
