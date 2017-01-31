angular.module("App").run(function ($rootScope, $state, Auth) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    // console.log("root scope event: ", event, toState);
    if (toState.authenticate && !Auth.isAuthenticated()){
      // User isn’t authenticated
      $state.transitionTo("homeState");
      event.preventDefault();
    }
  });
});
