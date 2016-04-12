/**
 *
 */
(function () {
  "use strict";

  angular
    .module('app.layout')
    .controller('layoutHeaderCtrl', ['$state', 'api', layoutHeaderCtrl]);

  function layoutHeaderCtrl($state, api) {

    var vm = this;

    //注销操作
    vm.logout = function () {

      // api.user
      //   .logout()
      //   .then(function (res) {
      //     if (res.data.errNo !== 0) {
      //
      //     }
      //     else {
      //       $state.go('page.login');
      //     }
      //   });
      $state.go('page.login');
    }
  }

})();
