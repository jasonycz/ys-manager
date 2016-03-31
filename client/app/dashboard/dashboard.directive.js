(function () {
  'use strict';

  var qrcode = function ($window) {

    return {
      restrict: 'E',
      scope:{
        options:'='
      },
      link: function (scope, ele, attrs) {

        new QRCode(ele[0],scope.options);

      }
    };
  };

  angular.module('app')
    .directive('qrcode', ['$window', qrcode]);


})();
