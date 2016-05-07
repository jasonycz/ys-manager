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
    var getUserInfoTimer=setInterval(function(){

      if(window.dataStorage.user&&window.dataStorage.user.data){
        vm.loginUser=window.dataStorage.user.data.user_name;
        window.clearInterval(getUserInfoTimer);
      }

    },1000);
   

    

    //注销操作
    vm.logout = function () {
      // 在本地注销用户数据
      window.dataStorage.user.clear();//data 变为 undefined

      api.user
        .logout()
        .then(function (res) {
          if (res.data.errNo !== 0) {
              toaster.pop('error', "出错了", res.data.errMsg);
               $state.go('page.login');
          }
          else {
            $state.go('page.login');
          }
        });
     
    }
  }

})();
