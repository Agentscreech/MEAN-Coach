angular.module('App')
    .component('loginComp', {
        templateUrl: 'app/containers/login/login.html',
        controller: LoginCompCtrl,
        controllerAs: 'loginComp'
    });

function LoginCompCtrl($scope, $state, UserService, $window) {
    $scope.user = {
        email: '',
        password: ''
    }
    $scope.userLogin = function() {
        UserService.login($scope.user).then(function(user) {
            console.log("login response:", user);
            if (user !== false) {
                // $window.location.href='/profile/' + user.id;
                $state.go('profileState', { id: user.id});
            }
            else {
                $state.go('homeState');
            }
        });
    };
}

LoginCompCtrl.$inject = ['$scope', '$state', 'UserService', '$window'];
