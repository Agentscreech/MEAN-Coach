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
    $urlRouterProvider.otherwise('/');

    // $httpProvider.interceptors.push('AuthInterceptor')

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
      url: '/profile',
      component: 'profileComp'
    })

    //Removes # symbol for our routes
    $locationProvider.html5Mode(true);
  }
]);
