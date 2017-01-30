angular.module('App')
.component('signupComp', {
  templateUrl: 'app/containers/signup/signup.html',
  controller: SignupCompCtrl,
  controllerAs: 'signupComp'
});

function SignupCompCtrl($scope, $state, UserService) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userSignup = function () {
    console.log("I am being clicked!");

    var params = {
      email: $scope.user.email,
      password: $scope.user.password
    }
    console.log("User Params from signup form: ", params);

    UserService.createAccount(params).then(function(user) {
      if (user === false) {
        console.log("user create error");
      }
      else {
        console.log("got user: ", user);
        //Redirect home on successful signup
        $state.go('homeState');
      }
    });
  };
}

SignupCompCtrl.$inject = ['$scope', '$state', 'UserService'];
