(function () {
  'use strict';

  angular.module('app.page')
    .controller('invoiceCtrl', ['$scope', '$window', invoiceCtrl])
    .controller('authCtrl', ['$scope', '$http', 'validateReg', authCtrl])
    .controller('ProfileController', ['$scope', '$state', ProfileController])
    .controller('uploadCtrl', ['$mdDialog', 'items', 'Upload', uploadCtrl])
    .controller('CreateJadeCtrl', ['$stateParams', '$mdDialog', CreateJadeCtrl])
    .controller('GoodDetailsJadeCtrl', ['$stateParams','$mdDialog', GoodDetailsJadeCtrl])
    .controller('showBigImgCtrl', ['$mdDialog','items', showBigImgCtrl])

  ;

  function ProfileController($scope, $state) {

  }

  function invoiceCtrl($scope, $window) {
    var printContents, originalContents, popupWin;

    $scope.printInvoice = function () {
      printContents = document.getElementById('invoice').innerHTML;
      originalContents = document.body.innerHTML;
      popupWin = window.open();
      popupWin.document.open();
      popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles/main.css" /></head><body onload="window.print()">' + printContents + '</html>');
      popupWin.document.close();
    }
  }

  function authCtrl($scope, $http, validateReg) {

    var vm = this;
    vm.validate = validateReg;
    vm.form = {};

    //登录
    vm.login = function ($event) {
      $event.preventDefault();

      $http.post('/dataefasdfadsf', vm.form).then(function () {
        console.log(arguments)
      });
    };

    vm.signup = function () {
      alert(2)
    };

    //修改密码
    vm.updatePwd = function () {

      alert(vm.form.phone);

      $http.post('/api/updatepassword', {
        phone: vm.form.phone,
        password: vm.form.password
      }).then(function () {
        // todo something.....
      })
    };

    //忘记密码
    vm.forgotPwd = function () {
      alert(vm.form.email)
    }

  }

  /**
   * 创建玉石
   * @param $scope
   * @param $log
   * @constructor
   */
  function CreateJadeCtrl($stateParams, $mdDialog) {

    var self = this;

    //alert($stateParams.type)

    //下拉框
    self.jadeType = [
      {id: 1, text: '真玉'},
      {id: 2, text: '翡翠'},
      {id: 3, text: '内蒙古佘太翠'},
      {id: 4, text: '新疆和阗玉'},
      {id: 5, text: '岫山玉'}
    ];

    self.tabs = {
      selectedIndex: 0
    };

    self.form = {};

    //
    self.submit = function () {
      //ajax
      self.tabs.selectedIndex = 1;
    };

    //upload img
    self.upload = function ($event) {

      $mdDialog.show({
        controller: 'uploadCtrl',
        controllerAs: 'vm',
        templateUrl: 'upload-files.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        locals: {
          items: {}
        }
        //clickOutsideToClose: true
      });


    }
  };

  function uploadCtrl($mdDialog, items, Upload) {
    var self = this;

    self.cancel = function () {
      $mdDialog.hide();
    };

    self.uploadFiles = function ($files) {
      self.files = $files;

      if (self.files && self.files.length) {
        Upload.upload({
          url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
          data: {
            files: self.files
          }
        }).then(function (response) {
          $timeout(function () {
            $scope.result = response.data;
          });
        }, function (response) {
          if (response.status > 0) {
            $scope.errorMsg = response.status + ': ' + response.data;
          }
        }, function (evt) {
          self.progress =
            Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }


    }

  }

  function GoodDetailsJadeCtrl($stateParams,$mdDialog) {
    var vm = this;

    vm.items = [
      {
        name: '开天辟地',
        css:'',
        introduce: '简单的介绍,How to pass an angular-material list to an angular-material dialog?',
        photos: [
          'images/assets/600_400-1.jpg',
          'images/assets/600_400-2.jpg',
          'images/assets/600_400-3.jpg',
          'images/assets/600_400-4.jpg',
          'images/assets/600_400-5.jpg']
      },
      {
        name: '二',
        css:'b-primary',
        introduce: '简单的介绍,How to pass an angular-material list to an angular-material dialog?',
        photos: [
          'images/assets/600_400-1.jpg',
          'images/assets/600_400-2.jpg',
          'images/assets/600_400-3.jpg',
          'images/assets/600_400-4.jpg',
          'images/assets/600_400-5.jpg']
      },
      {
        name: '3',
        css:'b-info',
        introduce: '简单的介绍,How to pass an angular-material list to an angular-material dialog?',
        photos: [
          'images/assets/600_400-1.jpg',
          'images/assets/600_400-2.jpg',
          'images/assets/600_400-3.jpg',
          'images/assets/600_400-4.jpg',
          'images/assets/600_400-5.jpg']
      },
      {
        name: '4',
        css:'b-white',
        introduce: '简单的介绍,How to pass an angular-material list to an angular-material dialog?',
        photos: [
          'images/assets/600_400-1.jpg',
          'images/assets/600_400-2.jpg',
          'images/assets/600_400-3.jpg',
          'images/assets/600_400-4.jpg',
          'images/assets/600_400-5.jpg']
      },
      {
        name: '5',
        css:'b-white',
        introduce: '简单的介绍,How to pass an angular-material list to an angular-material dialog?',
        photos: [
          'images/assets/600_400-1.jpg',
          'images/assets/600_400-2.jpg',
          'images/assets/600_400-3.jpg',
          'images/assets/600_400-4.jpg',
          'images/assets/600_400-5.jpg']
      }
    ]

    vm.showBigImg=function (imgUrl,$event) {

      $mdDialog.show({
        controller: 'showBigImgCtrl',
        controllerAs: 'vm',
        templateUrl: 'showBigImg.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        locals: {
          items: {url: imgUrl}
        }
        //clickOutsideToClose: true
      });

    }

  }

  function showBigImgCtrl($mdDialog, items) {
     var vm=this;
    vm.cancel = function () {
      $mdDialog.hide();
    };

    vm.item=items;

     console.log(vm.item,items);

  }

})();
