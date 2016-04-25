(function () {
  'use strict';

  angular
    .module('app.page')
    .controller('DashboardCtrl', ['$mdDialog', 'api', 'toaster', DashboardCtrl])
    .controller('QRcodeCtrl', ['$mdDialog', 'items', QRcodeCtrl])
    .controller('invoiceCtrl', ['$scope', '$window', invoiceCtrl])
    .controller('AuthCtrl', ['$state', 'api','validateReg', 'toaster','$timeout', authCtrl])
    .controller('LoginCtrl', ['$state', 'api', 'validateReg', 'toaster', LoginCtrl])
    .controller('ProfileCtrl', ['$scope', '$state', ProfileCtrl])
    .controller('uploadCtrl', ['$timeout', '$mdDialog', 'items', 'Upload', 'api', 'toaster', uploadCtrl]) //时间轴添加照片弹框
    .controller('addTxtCtrl', ['$mdDialog', 'items', addTxtCtrl]) //时间轴添加介绍弹框
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
          items: item
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
        // var data = new Object();
        // data.studio_id = 36;
        api
          .studio
          .showcraft()
          .then(function (res) {
            if (res.data.errNo !== 0) {
              //toaster.pop('error', '数据获取失败', res.data.errMsg)
            }
            else {
              vm.items = res.data.result;
            }

          });

      }

    };
    // 删除玉石
    vm.delcraft = function (craft_id){
      var data = new Object();
      data.craft_id = craft_id;
      // console.log(data.craft_id);
      if(confirm("确定要删除该玉石数据?")){
          api.studio.delcraft(data).then(function (res) {
            //alert("dsds");
            if (res.data.errNo === 0) {
              // console.log(res.data);
              toaster.pop('success', "删除玉石成功");
              $state.go('dashboard');
            }
            else {
               // console.log(res.data);
              toaster.pop('error', "出错了", res.data.errMsg);
            }
          },function(res){
            toaster.pop('error', "删除玉石失败!", res.data.errMsg);
          })
      }

      
    }


     vm.showItems('published');
    // window.dataStorage.user.save("happy");
  }

  /**
   * 二维码
   * @param $mdDialogå
   * @param items
   * @constructor
   */
  function QRcodeCtrl($mdDialog, items) {

    var vm = this;
    vm.qrcode = {
      width: 120,
      height: 120,
      text: 'http://101.201.198.27/studio/showonecraft?studioid=' + window.dataStorage.user.data.studio_id + '&craftid=' + items.craft_id + '&type=1'
    };
    vm.cancel = function () {
      $mdDialog.hide();
    };
  }

  function ProfileCtrl($scope, $state) { }

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
        // console.log('已经登录');
        // console.log(window.dataStorage.user);
        // console.log(res.data);
      }
    });
    vm.validate = validateReg;
    // vm.form = {
    //   phone: '13121902385',
    //   passwd: '1234567'
    // };
    //登录
    vm.login = function () {
      // alert('login');
        vm.loginable = false;
        api.user.login(vm.form).then(function (res) {
        vm.loginable = true;

        if (res.data.errNo === 0) {
          // console.log(res.data.result);
          window.dataStorage.user.save(res.data.result);
          // console.log(window.dataStorage.user);
          // alert('save');
          $state.go('dashboard');
        }
        else {
          toaster.pop('error', "出错了", res.data.errMsg);
        }

      });
    };
    vm.login();
  }

  /**
   * 身份验证
   * @param $scope
   * @param $http
   * @param validateReg
   */
  function authCtrl($state, api, validateReg, toaster, $timeout) {
    var vm = this;
    vm.validate = validateReg;
    vm.form = {};
    // alert('ok');
    //登录
    vm.login = function ($event) {
      $event.preventDefault();

      $http.post('/dataefasdfadsf', vm.form).then(function () {
        //console.log(arguments)
      });
    };

    vm.signup = function () {
      alert(2);
    };

    // 修改密码
    vm.updatePwd = function () {

      var data = new Object();
      data.user_id = window.dataStorage.user.data.user_id;
      data.old_password = vm.form.old_password;
      data.new_password = vm.form.new_password;
      // console.log(data);
      api.user.resetpwd(data).then(function (res) {
        // todo something.....
        // console.log(window.dataStorage.user.data.user_id);
        if (res.data.errNo === 0) {
          toaster.pop('success', "重置密码成功");
          $state.go('dashboard');
        }
        else {
          toaster.pop('error', "出错了", res.data.errMsg);
        }
      },function(res){
        toaster.pop('error', "重置密码失败!", res.data.errMsg);
      })
    };
    vm.getVerifyCode = function (){
      // 定义按钮btn
      var btn = $("#sendVerifyBtn");
           
      // 定义发送时间间隔(s)
      var SEND_INTERVAL = 30;
      var timeLeft = SEND_INTERVAL;

      if(vm.form.user.phone){
        var data = new Object();
        data.phone = vm.form.user.phone;
        vm.form.validation = true;
        api.user.getverify(data);
        // var temp = api.user.getverify(data);
        // console.log(temp);
      }else{
        toaster.pop('error', "请输入电话号码");
        return;
      }          
      var timeCount = function() {
          $timeout(function() {
              if(timeLeft > 0) {
                  timeLeft -= 1;
                  btn.html(timeLeft + "秒后重新发送");
                  timeCount();
              } else {
                  // console.log('ok');
                 vm.form.validation = false;
                 btn.html("发送短信验证码");
              }
          }, 1000);
      }
       timeCount();
    }
    //忘记密码
    vm.forgotPwd = function () {

      var data = new Object();
      data.phone = vm.form.user.phone;
      data.verify_code = vm.form.user.verify_code;
      data.password = vm.form.user.new_password;
      api.user.resetbyphone(data).then(function (res) {
        // todo something.....
        if (res.data.errNo === 0) {
          toaster.pop('success', "重置密码成功");
           console.log(res.data);
          $state.go('page.login');
        }
        else {
          toaster.pop('error', "出错了 forgotPwd", res.data.errMsg);
        }
      },function(res){
        toaster.pop('error', "重置密码失败!", res.data.errMsg);
      })
    };
    

  }

  /**
   * 创建玉石
   * @param $scope
   * @param $log
   * @constructor
   */
  function CreateJadeCtrl($stateParams, $mdDialog, api, toaster) {

    var vm = this;
    vm.timeline = [
      {
        name: '原石',
        description: '',
        img: ['images/assets/600_400-1.jpg'],
        className: 'b-info'
      },
      {
        name: '设计',
        img: ['images/assets/600_400-1.jpg', 'images/assets/600_400-1.jpg'],
        className: ''
      },
      {
        name: '粗绘',
        img: ['images/assets/600_400-1.jpg', 'images/assets/600_400-1.jpg', 'images/assets/600_400-1.jpg'],
        className: 'b-primary'
      },
      {
        name: '细绘',
        img: ['images/assets/600_400-1.jpg', 'images/assets/600_400-1.jpg', 'images/assets/600_400-1.jpg', 'images/assets/600_400-1.jpg'],
        className: 'b-white'
      },
      {
        name: '打磨抛光',
        img: ['images/assets/600_400-1.jpg', 'images/assets/600_400-1.jpg', 'images/assets/600_400-1.jpg', 'images/assets/600_400-1.jpg', 'images/assets/600_400-1.jpg'],
        className: 'b-white'
      },
      {
        name: '落款证书',
        img: ['images/assets/600_400-1.jpg'],
        className: 'b-white'
      },
      {
        name: '结束（物流）',
        img: ['images/assets/600_400-1.jpg', 'images/assets/600_400-1.jpg'],
        className: 'b-white'
      }
    ];
    vm.form = {
      craft_id: $stateParams.id,
      publish: 0
    };

    vm.tabs = {
      selectedIndex: 0
    };
    var getcid = function () {
      api
        .studio
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
    if (vm.form.craft_id) {
      api
        .studio
        .modifyArticle({
          params: {
            aid: 0,
            craft_id: vm.form.craft_id
          }
        }).then(function (res) {
          if (res.data.errNo === 0) {
            vm.form = res.data.result;
          }
          else {
            toaster.pop('error', '出错了', res.data.errMsg);
          }
        }, function (err) {

        })
    }
    else {
      //获取雕件id
      getcid();
    }

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
          items: { index: index }
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

    };

  }

  //上传弹框
  function uploadCtrl($timeout, $mdDialog, items, Upload, api, toaster) {

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
          file: vm.files[0],
          sendFieldsAs: 'form'
        }).then(function (response) {
          if (response.data.errNo === 0) {
            vm.form.push(response.data.result.img_url);
            //vm.result = response.data;
          }
        }, function (response) {
          if (response.status > 0) {
            toaster.pop('error', '图片上传失败', response.status + ': ' + response.data);
          }
        }, function (evt) {
          vm.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }
    }

  }

  //时间轴添加介绍弹框
  function addTxtCtrl($mdDialog, items) {
    //console.log($mdDialog)
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
    vm.article = {};
    vm.timeLine = [
      {
        name: '开天辟地',
        css: '',
        introduce: '',
        photos: []
      },
      {
        name: '二',
        css: 'b-primary',
        introduce: '',
        photos: []
      },
      {
        name: '3',
        css: 'b-info',
        introduce: '',
        photos: []
      },
      {
        name: '4',
        css: 'b-white',
        introduce: '',
        photos: []
      },
      {
        name: '5',
        css: 'b-success',
        introduce: '',
        photos: []
      }
    ];
    //get data
    api
      .studio
      .showonecraft({
        params: {
          craft_id: $stateParams.id,
          type: 1 //时间轴
        }
      }).then(function (res) {
        vm.timeLine = res.data.result;
      });

    api
      .studio
      .showonecraft({
        params: {
          craft_id: $stateParams.id,
          type: 2 //时间轴
        }
      }).then(function (res) {
        vm.article = res.data.result[0];
      });
    //显示大图片
    vm.showBigImg = function (imgUrl, $event) {

      $mdDialog.show({
        controller: 'showBigImgCtrl',
        controllerAs: 'vm',
        templateUrl: 'showBigImg.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        locals: {
          items: { url: imgUrl }
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

    //console.log(vm.item, items);
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
      { id: 1, url: 'images/assets/600_400-1.jpg' },
      { id: 1, url: 'images/assets/600_400-2.jpg' },
      { id: 1, url: 'images/assets/600_400-3.jpg' },
      { id: 1, url: 'images/assets/600_400-4.jpg' },
      { id: 1, url: 'images/assets/600_400-5.jpg' },
      { id: 1, url: 'images/assets/600_400-6.jpg' }
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
