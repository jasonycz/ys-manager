/**
 *
 */
(function () {
  "use strict";

  angular
    .module('app.layout')
    .controller('layoutHeaderCtrl', ['$state', 'api', 'toaster', layoutHeaderCtrl]);

  function layoutHeaderCtrl($state, api, toaster) {

    var vm = this;
    if(window.dataStorage.user.data){
      vm.loginUser=window.dataStorage.user.data.user_name;
    }
    


    //注销操作
    vm.logout = function () {

      api.user
        .logout()
        .then(function (res) {
          if (res.data.errNo !== 0) {
              toaster.pop('error', "出错了", res.data.errMsg);
          }
          else {
            $state.go('page.login');
          }
        });
      $state.go('page.login');
    }
  }

})();
