(function () {
  'use strict';

  angular.module('app.core', [
    // Angular modules
    'ngAnimate'
    , 'ngMessages'

    // Custom modules
    , 'app.layout'
    , 'app.i18n'

    // 3rd Party Modules
    , 'ngMaterial'
    , 'ui.router'
    , 'ui.bootstrap'
    , 'duScroll'
    , 'ngFileUpload'
    , 'toaster'
  ]);

})();

