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

    $httpProvider.interceptors.push('AuthInterceptor');

    //Setup states (routes)
    $stateProvider
    .state('homeState', {
      url: '/',
      component: 'homeComp',
      authenticate: false
    })
    .state('signupState', {
      url: '/signup',
      component: 'signupComp',
      authenticate: false
    })
    .state('loginState', {
      url: '/login',
      component: 'loginComp',
      authenticate: false
    })
    .state('profileState', {
      url: '/profile/:id',
      component: 'profileComp',
      authenticate: true
    });

    //Redirect to login if url not found or not authenticated
    $urlRouterProvider.otherwise("/");
    // $urlRouterProvider.otherwise('/');

    //Removes # symbol for our routes
    $locationProvider.html5Mode(true);
  }
]);
