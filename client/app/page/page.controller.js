(function () {
  'use strict';

  angular
    .module('app.page')
    .controller('DashboardCtrl', ['$mdDialog', 'api', 'toaster', DashboardCtrl])
    .controller('QRcodeCtrl', ['$mdDialog', 'items', QRcodeCtrl])
    .controller('invoiceCtrl', ['$scope', '$window', invoiceCtrl])
    .controller('AuthCtrl', ['api', 'validateReg', authCtrl])
    .controller('LoginCtrl', ['$state', 'api', 'validateReg', 'toaster', LoginCtrl])
    .controller('ProfileCtrl', ['$scope', '$state', ProfileCtrl])
    .controller('uploadCtrl', ['$timeout', '$mdDialog', 'items', 'Upload', 'api', uploadCtrl]) //时间轴添加照片弹框
    .controller('addTxtCtrl', ['$mdDialog', 'items', uploadCtrl]) //时间轴添加介绍弹框
    .controller('CreateJadeCtrl', ['$stateParams', '$mdDialog', 'api', 'toaster', CreateJadeCtrl])
    .controller('GoodDetailsJadeCtrl', ['$stateParams', 'api', '$mdDialog', GoodDetailsJadeCtrl])
    .controller('showBigImgCtrl', ['$mdDialog', 'items', showBigImgCtrl]) //显示大图
    .controller('photoAlbumCtrl', ['$mdDialog', 'items', photoAlbumCtrl]) //在线相册
  ;

  //面板
  function DashboardCtrl($mdDialog, api, toaster) {
    var vm = this;
    vm.items = [];

    vm.showQR = function (item, $event) {

      $mdDialog.show({
        controller: 'QRcodeCtrl',
        controllerAs: 'vm',
        templateUrl: 'QRcodeCtrl.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        locals: {
          items: {text: item.url}
        }
      });

    };

    vm.showItems = function (type) {

      if (type === 'unpublished') {

        api.studio.listnofinish().then(function (res) {
          if (res.data.errNo !== 0) {
            //toaster.pop('error', '数据获取失败', res.data.errMsg)
          }
          else {
            vm.items = res.data.result;
          }
        });
      }
      else if (type === 'published') {

        api.studio.showcraft().then(function (res) {

          if (res.data.errNo !== 0) {
            //toaster.pop('error', '数据获取失败', res.data.errMsg)
          }
          else {
            vm.items = res.data.result;
          }

        });

      }

    };

    vm.showItems('published');

    // vm.items = [
    //   {
    //     craft_id: 1,
    //     img: 'images/assets/600_400-1.jpg',
    //     craft_name: '我是名字一',
    //     describe: '详细',
    //     url: 'https://yingyj.com',
    //     details: '#'
    //   },
    //   {
    //     craft_id: 2,
    //     img: 'images/assets/600_400-2.jpg',
    //     craft_name: '我是名字二',
    //     url: 'https://yingyj.com',
    //     describe: '详细',
    //     details: '#'
    //   },
    //   {
    //     craft_id: 3,
    //     img: 'images/assets/600_400-3.jpg',
    //     craft_name: '我是名字3',
    //     url: 'https://yingyj.com',
    //     describe: '详细',
    //     details: '#'
    //   },
    //   {
    //     craft_id: 4,
    //     img: 'images/assets/600_400-4.jpg',
    //     craft_name: '我是名字3',
    //     url: 'https://yingyj.com',
    //     describe: '详细',
    //     details: '#'
    //   },
    //   {
    //     craft_id: 5,
    //     img: 'images/assets/600_400-5.jpg',
    //     craft_name: '我是名字3',
    //     url: 'https://yingyj.com',
    //     describe: '详细',
    //     details: '#'
    //   },
    //   {
    //     craft_id: 6,
    //     img: 'images/assets/600_400-6.jpg',
    //     craft_name: '我是名字3',
    //     url: 'https://yingyj.com',
    //     describe: '详细',
    //     details: '#'
    //   }
    // ];
  }

  /**
   * 二维码
   * @param $mdDialog
   * @param items
   * @constructor
   */
  function QRcodeCtrl($mdDialog, items) {

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

  //登陆页
  function LoginCtrl($state, api, validateReg, toaster) {
    var vm = this;
    vm.loginable = true;
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

      vm.loginable = false;
      api.user.login(vm.form).then(function (res) {
        vm.loginable = true;

        if (res.data.errNo === 0) {
          $state.go('dashboard');
        }
        else {
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
  function CreateJadeCtrl($stateParams, $mdDialog, api, toaster) {

    var vm = this;
    vm.form = [
      {
        name: '原石',
        description: '',
        img: ['images/assets/600_400-1.jpg'],
        className:'b-info'
      },
      {
        name: '设计',
        img: ['images/assets/600_400-1.jpg','images/assets/600_400-1.jpg'],
        className:''
      },
      {
        name: '粗绘',
        img: ['images/assets/600_400-1.jpg','images/assets/600_400-1.jpg','images/assets/600_400-1.jpg'],
        className:'b-primary'
      },
      {
        name: '细绘',
        img: ['images/assets/600_400-1.jpg','images/assets/600_400-1.jpg','images/assets/600_400-1.jpg','images/assets/600_400-1.jpg'],
        className:'b-white'
      },
      {
        name: '打磨抛光',
        img: ['images/assets/600_400-1.jpg','images/assets/600_400-1.jpg','images/assets/600_400-1.jpg','images/assets/600_400-1.jpg','images/assets/600_400-1.jpg'],
        className:'b-white'
      },
      {
        name: '落款证书',
        img: ['images/assets/600_400-1.jpg'],
        className:'b-white'
      },
      {
        name: '结束（物流）',
        img: ['images/assets/600_400-1.jpg','images/assets/600_400-1.jpg'],
        className:'b-white'
      }
    ];

    vm.tabs = {
      selectedIndex: 0
    };

    //获取雕件id
    var getcid = function () {
      api.studio
        .getcid()
        .then(function (res) {
          if (res.data.errNo === 0) {
            vm.form.craft_id = res.data.result.craft_id;
          }
          else {
            toaster.pop('error', '获取雕件id失败', '正在重新获取,错误信息:' + res.data.errMsg);

            if (res.data.errNo !== 100012) {
              setTimeout(function () {
                getcid();
              }, 200);
            }

          }

        });
    };
    getcid();

    //基本资料部分
    vm.submit = function () {
      var msg = '';
      if (vm.form.Aid) {//修改
        //1:发布   0:预览
        vm.form.publish = 1;
        msg = '修改成功';
      }
      else {
        msg = '添加成功';
      }

      api.studio
        .upData(vm.form)
        .then(function (res) {
          if (res.data.errNo === 0) {
            toaster.pop('success', '成功', msg);

            vm.tabs.selectedIndex = 1;
            vm.form = {};//reset
          }
        });

    };

    //打开在线相册
    vm.showPhotoAlbum = function ($event) {

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
    vm.upload = function (index, $event) {
      $mdDialog.show({
        controller: 'uploadCtrl',
        controllerAs: 'vm',
        templateUrl: 'upload-files.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        locals: {
          items: {index: index}
        }
        //clickOutsideToClose: true
      });
    };

    vm.addDescription = function (index, $event) {

      $mdDialog.show({
        controller: 'addTxtCtrl',
        controllerAs: 'vm',
        templateUrl: 'add-txt.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        fullscreen: true,
        locals: {
          items: {}
        }
        //clickOutsideToClose: true
      }).then(function (answer) {
        vm.form[index].description = answer;
      }, function () {

      });

    }
  };

  //上传弹框
  function uploadCtrl($timeout, $mdDialog, items, Upload, api) {

    var vm = this;
    vm.form = [];

    vm.cancel = function () {
      $mdDialog.hide(vm.form);
    };

    vm.uploadFiles = function ($files) {
      vm.files = $files;

      if (vm.files && vm.files.length) {
        Upload.upload({
          url: api.studio.uploaduyimg(),
          data: {
            files: vm.files
          }
        }).then(function (response) {
          $timeout(function () {
            vm.result = response.data;
          });
        }, function (response) {
          if (response.status > 0) {
            vm.errorMsg = response.status + ': ' + response.data;
          }
        }, function (evt) {
          vm.progress =
            Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }
    }

  }

  //时间轴添加介绍弹框
  function addTxtCtrl($mdDialog, items) {
    console.log($mdDialog)
    var vm = this;
    vm.form = {};

    vm.save = function () {
      $mdDialog.hide(vm.form);
    };

    vm.cancel = function () {
      $mdDialog.hide();
    };
  }

  /**
   * 预览-文章和时间轴
   * @param $stateParams
   * @param $mdDialog
   * @constructor
   */
  function GoodDetailsJadeCtrl($stateParams, api, $mdDialog) {
    var vm = this;
    vm.items = [];

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

    api.studio.showonecraft({
      craft_id: $stateParams.id,
      type: '1'//时间轴
    }).then(function (res) {
      vm.items = res.data.result;
    });

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
;
