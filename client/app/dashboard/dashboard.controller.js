(function () {
  'use strict';

  angular.module('app')
    .controller('DashboardCtrl', ['$mdDialog', DashboardCtrl])
    .controller('QRcodeCtrl', ['$mdDialog', 'items', QRcodeCtrl])
  ;

  function DashboardCtrl($mdDialog) {
    var vm = this;

    vm.showQR = function (url, $event) {

      $mdDialog.show({
        controller: 'QRcodeCtrl',
        controllerAs: 'vm',
        templateUrl: 'QRcodeCtrl.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        locals: {
          items: {text: url}
        }
        //clickOutsideToClose: true
      });
      // .then(function (answer) {
      //   $scope.status = 'You said the information was "' + answer + '".';
      // }, function () {
      //   $scope.status = 'You cancelled the dialog.';
      // });


      //var modalInstance =
      // $uibModal.open({
      //   //animation: true,
      //   templateUrl: 'QRcodeCtrl.html',
      //   controller: 'QRcodeCtrl',
      //   controllerAs: 'vm',
      //   size: 'sm',
      //   resolve: {
      //     items: {text:url}
      //   }
      // });


    };

    vm.delItem = function (id) {
      alert('删除' + id);
    };
  }

  function QRcodeCtrl($mdDialog, items) {
    console.log(items);

    var vm = this;
    vm.qrcode = {
      width: 120,
      height: 120,
      text: items.text
    };
    vm.cancel = function () {
      $mdDialog.hide();
    };

  }
})();
