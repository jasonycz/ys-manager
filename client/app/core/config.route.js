(function () {
  'use strict';

  angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var routes, setRoutes;

      $urlRouterProvider
        .when('/', '/dashboard')
        .otherwise('/dashboard');

      $stateProvider
        .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html'
      })
        .state('page', {
          abstract: true,
          url: '/page',
          template: '<div ui-view class="fade-in-up"></div>'
        })
        .state('page.createJade', {
          url: '/createJade/{type}',
          templateUrl: 'app/page/createJade.html'
        })
        .state('page.profile', {
          url: '/profile',
          templateUrl: 'app/page/profile.html'
        })
        .state('page.updatepassword', {
          url: '/updatepassword',
          templateUrl: 'app/page/updatepassword.html'
        })
        .state('page.login', {
          url: '/login',
          templateUrl: 'app/page/login.html'
        })
      ;
        // routes = [
        //   'page/createJade',
        //   'page/profile',
        //   //'page/forgot-password',
        //   'page/updatepassword',
        //   'page/login'
        // ];
        //
        // setRoutes = function (route) {
        //   var config, url;
        //   url = '/' + route;
        //   config = {
        //     url: url,
        //     templateUrl: 'app/' + route + '.html'
        //   };
        //   $stateProvider.state(route, config);
        //   return $stateProvider;
        // };
        //
        // routes.forEach(function (route) {
        //   return setRoutes(route);
        // });

      }]
    );

})();
