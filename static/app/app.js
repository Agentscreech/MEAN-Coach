angular.module('App', ['ui.router', 'ngResource'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  '$httpProvider',
  '$resourceProvider',
  function(
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    $httpProvider,
    $resourceProvider)
    {
      $resourceProvider.defaults.actions = {
      create: {method: 'POST'},
      get:    {method: 'GET'},
      getAll: {method: 'GET', isArray:true},
      update: {method: 'PUT'},
      delete: {method: 'DELETE'}
    };
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
