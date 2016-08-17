(function () {
  'use strict';

  angular.module('app.page')
    .directive('customPage', customPage)
    .directive('qrcode', ['$window', qrcode]);

   function qrcode($window) {

    return {
      restrict: 'E',
      scope: {
        options: '='
      },
      link: function (scope, ele, attrs) {
        console.log(ele,scope.options);
        new QRCode(ele[0], scope.options);

      }
    };
  };

  // add class for specific pages to achieve fullscreen, custom background etc.
  function customPage() {
    var directive = {
      restrict: 'A',
      controller: ['$scope', '$element', '$location', customPageCtrl]
    };

    return directive;

    function customPageCtrl($scope, $element, $location) {
      var addBg, path;

      path = function () {
        return $location.path();
      };

      addBg = function (path) {
        $element.removeClass('body-wide body-err body-lock body-auth');
        switch (path) {
          case '/404':
          case '/page/404':
          case '/page/500':
            return $element.addClass('body-wide body-err');
          case '/page/updatepassword':
          case '/page/login':
          case '/page/forgot-password':
            return $element.addClass('body-wide body-auth');
          case '/page/lock-screen':
            return $element.addClass('body-wide body-lock');
        }
      };

      addBg($location.path());

      $scope.$watch(path, function (newVal, oldVal) {
        if (newVal === oldVal) {
          return;
        }
        return addBg($location.path());
      });
    }
  }

})();
