(function () {
  'use strict';

  angular
    .module('app.page', [
        //'textAngular'
    ])
    .constant('validateReg', {
      mobile: /^(0|86|17951)?(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
      email: /^[a-z0-9][a-z0-9._-]*@[a-z0-9_-]+(\.[a-z0-9_-]+)+$/i
    });
})();
