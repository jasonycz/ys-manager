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
    vm.loginUser='';
    if(window.dataStorage.user&&(window.dataStorage.user.data!= undefined)){
      vm.loginUser=window.dataStorage.user.data.user_name;
    }

    //注销操作
    vm.logout = function () {
      // 在本地注销用户数据
      window.dataStorage.user.clear();//data 变为 undefined

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
