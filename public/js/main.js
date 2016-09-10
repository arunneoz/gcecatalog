var pharmFE = angular.module('pharmFE', ['ngRoute','ngMessages','ngStorage']);

pharmFE.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      access: {restricted: true}
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })

    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })

    .when('/prescribe', {
      templateUrl: 'partials/prescription.html',
      access: {restricted: true}

      })

      .when('/printlabel', {
        templateUrl: 'partials/prescriptionlabel.html'
      })

      .when('/tasks', {
        templateUrl: 'partials/tasks.html'
      })

    .otherwise({
      redirectTo: '/'
    });
});

pharmFE.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});
