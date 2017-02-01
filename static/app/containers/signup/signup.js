angular.module('App')
.component('signupComp', {
  templateUrl: 'app/containers/signup/signup.html',
  controller: SignupCompCtrl,
  controllerAs: 'signupComp'
});

function SignupCompCtrl($scope, $state, UserService, $window) {
    var signupComp = this;
    signupComp.error = false;
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userSignup = function () {
    // console.log("I am being clicked!");

    var params = {
      email: $scope.user.email,
      password: $scope.user.password
  };
    // console.log("User Params from signup form: ", params);

    UserService.createAccount(params).then(function(user) {
      if (user.id) {
        // console.log("got user: ", user);
        // console.log('trying to login with this', params)
        //Redirect to userSettings on successful signup
        UserService.login(params).then(function(user) {
                // console.log("login response:", user);
                if (user !== false) {
                    $window.location.href='/profile/' + user.id + '/userSettings';
                    // $state.go('profileState', { id: user.id});
                }
                else {
                    $state.go('homeState');
                }
            });
      }
      else {
        // console.log("user create error");
        signupComp.error = user.data.message;
      }
    });
  };
}

SignupCompCtrl.$inject = ['$scope', '$state', 'UserService', '$window'];
