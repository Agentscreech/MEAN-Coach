angular.module('App', ['ui.router'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  '$httpProvider',
  function(
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    $httpProvider)
    {
      // console.log(Auth);
    $httpProvider.interceptors.push('AuthInterceptor');

    //Setup states (routes)
    $stateProvider
    .state('homeState', {
      url: '/',
      component: 'homeComp'
    })
    .state('signupState', {
      url: '/signup',
      component: 'signupComp'
    })
    .state('loginState', {
      url: '/login',
      component: 'loginComp'
    })
    .state('profileState', {
      url: '/profile/:id',
      component: 'profileComp'
      // params: {id: profile.id}
    })
    .state('userSettingsState', {
        url: '/profile/:id/userSettings',
        component: 'userSettingsComp'
    })
    .state('navbarState', {
        url: '/',
        component: 'navbarComp'
    });

    //Redirect to login if url not found or not authenticated
    $urlRouterProvider.otherwise("/");
    // $urlRouterProvider.otherwise('/');

    //Removes # symbol for our routes
    $locationProvider.html5Mode(true);
  }
]);
