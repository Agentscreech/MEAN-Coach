angular.module("App").run(function ($transitions, $state, Auth) {
  $transitions.onStart({to: 'profileState'}, function(trans) {
    if(!Auth.isLoggedIn()) {
      return trans.router.stateService.target('loginState');
    }
  })
});
