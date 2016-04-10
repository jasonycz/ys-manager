(function () {
  'use strict';

  angular
    .module('app.page')
    .controller('invoiceCtrl', ['$scope', '$window', invoiceCtrl])
    .controller('AuthCtrl', ['api', 'validateReg', authCtrl])
    .controller('LoginCtrl', ['$state','api', 'validateReg','toaster', LoginCtrl])
    .controller('ProfileCtrl', ['$scope', '$state', ProfileCtrl])
    .controller('uploadCtrl', ['$mdDialog', 'items', 'Upload', uploadCtrl])
    .controller('CreateJadeCtrl', ['$stateParams', '$mdDialog', CreateJadeCtrl])
    .controller('GoodDetailsJadeCtrl', ['$stateParams', '$mdDialog', GoodDetailsJadeCtrl])
    .controller('showBigImgCtrl', ['$mdDialog', 'items', showBigImgCtrl]) //显示大图
    .controller('photoAlbumCtrl', ['$mdDialog', 'items', photoAlbumCtrl]) //在线相册
  ;

  function ProfileCtrl($scope, $state) {

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

  function LoginCtrl($state,api, validateReg,toaster) {
    var vm = this;
    vm.loginable=true;
    api.me().then(function (res) {
      if (res.data.errNo === 0) {//已经登录
        $state.go('dashboard');
      }
    });
    vm.validate = validateReg;
    vm.form = {
      phone: '15212345698',
      passwd: '123456'
    };
    //登录
    vm.login = function () {

      vm.loginable=false;
      api.user.login(vm.form).then(function (res) {
        vm.loginable=true;

        if(res.data.errNo===0){
          $state.go('dashboard');
        }
        else{
          toaster.pop('error', "出错了", res.data.errMsg);
        }

      });
    };

  }

  /**
   * 身份验证
   * @param $scope
   * @param $http
   * @param validateReg
   */
  function authCtrl(api, validateReg) {

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

    self.jadeSize = [
      {id: 1, text: '超小'},
      {id: 2, text: '小'},
      {id: 3, text: '中'},
      {id: 4, text: '略大'},
      {id: 5, text: '大'}
    ];

    self.tabs = {
      selectedIndex: 0
    };

    self.form = {};


    //基本资料部分
    //
    self.submit = function () {
      //ajax
      self.tabs.selectedIndex = 1;
    };

    //打开在线相册
    self.showPhotoAlbum = function ($event) {

      $mdDialog.show({
        controller: 'photoAlbumCtrl',
        controllerAs: 'vm',
        templateUrl: 'photoAlbum.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        locals: {
          items: {}
        }
        //clickOutsideToClose: true
      }).then(function (items) {
        //选中了
        if (angular.isArray(items)) {
          alert('选中了' + items.length + '个');
        }

      }, function () {
        //取消
      });


    };

    //流程处理(时间轴)部分

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

  /**
   * 上传弹框
   * @param $mdDialog
   * @param items
   * @param Upload
   */
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

  /**
   * 预览-文章和时间轴
   * @param $stateParams
   * @param $mdDialog
   * @constructor
   */
  function GoodDetailsJadeCtrl($stateParams, $mdDialog) {
    var vm = this;

    vm.items = [
      {
        name: '开天辟地',
        css: '',
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
        css: 'b-primary',
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
        css: 'b-info',
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
        css: 'b-white',
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
        css: 'b-success',
        introduce: '简单的介绍,How to pass an angular-material list to an angular-material dialog?',
        photos: [
          'images/assets/600_400-1.jpg',
          'images/assets/600_400-2.jpg',
          'images/assets/600_400-3.jpg',
          'images/assets/600_400-4.jpg',
          'images/assets/600_400-5.jpg']
      }
    ];

    vm.showBigImg = function (imgUrl, $event) {

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

  /**
   * 显示大图片弹框
   * @param $mdDialog
   * @param items
   */
  function showBigImgCtrl($mdDialog, items) {
    var vm = this;
    vm.cancel = function () {
      $mdDialog.hide();
    };

    vm.item = items;

    console.log(vm.item, items);
  }

  /**
   * 显示在线相册
   * @param $mdDialog
   * @param items
   */
  function photoAlbumCtrl($mdDialog, items) {
    var vm = this;
    vm.selectItem = [];
    vm.items = [
      {id: 1, url: 'images/assets/600_400-1.jpg'},
      {id: 1, url: 'images/assets/600_400-2.jpg'},
      {id: 1, url: 'images/assets/600_400-3.jpg'},
      {id: 1, url: 'images/assets/600_400-4.jpg'},
      {id: 1, url: 'images/assets/600_400-5.jpg'},
      {id: 1, url: 'images/assets/600_400-6.jpg'}
    ];

    vm.selectItemFun = function (item) {

      //  var index= vm.selectItem.indexOf(item);
      // if(index>-1){
      //   vm.selectItem.push(item);
      // } else{
      //   vm.selectItem.slice(index,1);
      // }
      if (item.active) {
        vm.selectItem.slice(index, 1);
      } else {
        item.active = true;
        vm.selectItem.push(item);
      }

    };

    vm.cancel = function () {
      $mdDialog.hide();
    };
    vm.save = function () {
      $mdDialog.hide(vm.selectItem);
    };

  }

})();
