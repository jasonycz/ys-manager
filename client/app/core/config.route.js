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
            templateUrl: 'app/page/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'vm'
            // resolve: {
            //   deps: ['$ocLazyLoad',
            //     function( $ocLazyLoad ){
            //       return $ocLazyLoad.load(['bower_components/qrcode.js/qrcode.js']);
            //     }]
            // }
          })
          .state('page', {
            abstract: true,
            url: '/page',
            template: '<div ui-view class="fade-in-up"></div>'
          })
          .state('page.createJade', {
            url: '/createJade/:craft_id/:aid',
            templateUrl: 'app/page/createJade.html',
            controller: 'CreateJadeCtrl',
            controllerAs: 'vm'
            // resolve: {
            //   deps: ['$ocLazyLoad',
            //     function ($ocLazyLoad) {
            //       return $ocLazyLoad.load(['bower_components/angular-file-upload/dist/angular-file-upload.min.js']);
            //     }]
            // }
          })
          .state('page.profile', {
            url: '/profile',
            templateUrl: 'app/page/profile.html',
            controller:'ProfileCtrl',
            controllerAs:'vm'
          })
          .state('page.updatepassword', {
            url: '/updatepassword',
            templateUrl: 'app/page/updatepassword.html',
            controller:'AuthCtrl',
            controllerAs:'vm'
          })
          .state('page.forgotPwd', {
            url: '/forgotPwd',
            templateUrl: 'app/page/forgotPwd.html',
            controller:'AuthCtrl',
            controllerAs:'vm'
          })
          .state('page.login', {
            url: '/login',
            templateUrl: 'app/page/login.html',
            controller:'LoginCtrl',
            controllerAs:'vm'
          })
          .state('page.goodsDetails', {
            url: '/goodsDetails/:id',
            templateUrl: 'app/page/goodsDetails.html',
            controller:'GoodDetailsJadeCtrl',
            controllerAs:'vm'
          })
        ;

      }]
    );

})();
