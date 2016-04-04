(function () {
  'use strict';

  angular.module('app')
    .controller('DashboardCtrl', ['$mdDialog', DashboardCtrl])
    .controller('QRcodeCtrl', ['$mdDialog', 'items', QRcodeCtrl])
  ;

  function DashboardCtrl($mdDialog) {
    var vm = this;
    vm.items=[];

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

    vm.showItems=function (type) {
      if(type===''){


      }
      else if(type==='published'){

      }

    };


    vm.items = [
      {
        id:1,
        img:'images/assets/600_400-1.jpg',
        name:'我是名字一',
        url:'https://yingyj.com',
        details:'#'
      },
      {
        id:2,
        img:'images/assets/600_400-2.jpg',
        name:'我是名字二',
        url:'https://yingyj.com',
        details:'#'
      },
      {
        id:3,
        img:'images/assets/600_400-3.jpg',
        name:'我是名字3',
        url:'https://yingyj.com',
        details:'#'
      },
      {
        id:4,
        img:'images/assets/600_400-4.jpg',
        name:'我是名字3',
        url:'https://yingyj.com',
        details:'#'
      },
      {
        id:5,
        img:'images/assets/600_400-5.jpg',
        name:'我是名字3',
        url:'https://yingyj.com',
        details:'#'
      },
      {
        id:6,
        img:'images/assets/600_400-6.jpg',
        name:'我是名字3',
        url:'https://yingyj.com',
        details:'#'
      }
    ];
  }

  /**
   * 二维码
   * @param $mdDialog
   * @param items
   * @constructor
   */
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
