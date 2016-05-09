(function () {
  'use strict';

  angular.module('app.page')
    .directive('customPage', customPage)
    .directive('qrcode', ['$window', qrcode])
    .directive('ueditor', [ueditor]);

  function qrcode($window) {

    return {
      restrict: 'E',
      scope: {
        options: '='
      },
      link: function (scope, ele, attrs) {
        console.log(ele, scope.options);
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

  function ueditor() {
    return {
      restrict: 'AE',
      transclude: true,
      replace: true,
      template: '<script name="content" type="text/plain" ng-transclude></script>',
      require: '?ngModel',
      scope: {
        config: '=',
        editor: '='
      },
      link: function (scope, element, attrs, ngModel) {
        //todo: ueditor 路径
        var editor = new UE.ui.Editor(scope.config || {});
        scope.editor = editor;
        editor.render(element[0]);

        if (ngModel) {
          //Model数据更新时，更新百度UEditor
          ngModel.$render = function () {
            try {
              editor.setContent(ngModel.$viewValue);
            } catch (e) { }
          };
          //百度UEditor数据更新时，更新Model
          editor.addListener('contentChange', function () {
            setTimeout(function () {
              scope.$apply(function () {
                ngModel.$setViewValue(editor.getContent());
              })
            }, 0);
          })
        }
      }
    }
  }
})();
