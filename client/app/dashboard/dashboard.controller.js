(function () {
  'use strict';

  angular.module('app')
    .controller('DashboardCtrl', ['$uibModal', DashboardCtrl])
    .controller('QRcodeCtrl', ['$uibModalInstance', 'items', QRcodeCtrl])
  ;

  function DashboardCtrl($uibModal) {
    var vm = this;

    vm.showQR = function (url) {


      //var modalInstance =
      $uibModal.open({
        //animation: true,
        templateUrl: 'QRcodeCtrl.html',
        controller: 'QRcodeCtrl',
        controllerAs: 'vm',
        size: 'sm',
        resolve: {
          items: {text:url}
        }
      });

      // modalInstance.result.then(function (selectedItem) {
      //   $scope.selected = selectedItem;
      // }, function () {
      //
      // });

    };

    vm.delItem = function (id) {
      alert('删除' + id);
    };
  }

  function QRcodeCtrl($uibModalInstance, items) {
    console.log(items);

    var vm = this;
    vm.qrcode = {
      width: 120,
      height: 120,
      text: items.text
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };

  }
})();
