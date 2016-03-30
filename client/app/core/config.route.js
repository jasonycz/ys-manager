(function () {
  'use strict';

  angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var routes, setRoutes;

        routes = [
          'page/blank',
          'page/profile',
          //'page/forgot-password',
          'page/updatepassword',
          'page/login'
        ];

        setRoutes = function (route) {
          var config, url;
          url = '/' + route;
          config = {
            url: url,
            templateUrl: 'app/' + route + '.html'
          };
          $stateProvider.state(route, config);
          return $stateProvider;
        };

        routes.forEach(function (route) {
          return setRoutes(route);
        });

        $urlRouterProvider
          .when('/', '/dashboard')
          .otherwise('/dashboard');


        $stateProvider.state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/dashboard/dashboard.html'
        });

      }]
    );

})();
