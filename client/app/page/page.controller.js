(function () {
  'use strict';

  angular
    .module('app.page')
    .controller('DashboardCtrl', ['$mdDialog', 'api', 'toaster', '$state', DashboardCtrl])
    .controller('QRcodeCtrl', ['$mdDialog', 'items', QRcodeCtrl])
    .controller('invoiceCtrl', ['$scope', '$window', invoiceCtrl])
    .controller('AuthCtrl', ['$state', 'api', 'validateReg', 'toaster', '$timeout', authCtrl])
    .controller('LoginCtrl', ['$state', 'api', 'validateReg', 'toaster', LoginCtrl])
    .controller('ProfileCtrl', ['$scope', '$state', ProfileCtrl])
    .controller('uploadCtrl', ['$timeout', '$mdDialog', 'items', 'Upload', 'api', 'toaster', '$interval', uploadCtrl]) //时间轴添加照片弹框
    .controller('addTxtCtrl', ['$mdDialog', 'items', addTxtCtrl]) //时间轴添加介绍弹框
    .controller('CreateJadeCtrl', ['$stateParams', '$mdDialog', 'api', 'toaster', '$state', '$timeout', CreateJadeCtrl])
    .controller('GoodDetailsJadeCtrl', ['$stateParams', 'api', '$mdDialog', GoodDetailsJadeCtrl])
    .controller('showBigImgCtrl', ['$mdDialog', 'items', showBigImgCtrl]) //显示大图
    .controller('photoAlbumCtrl', ['$mdDialog', '$timeout', 'items', 'api', 'Upload', photoAlbumCtrl]) //在线相册
    ;

  //面板
  function DashboardCtrl($mdDialog, api, toaster, $state) {

    // var test=[];
    // console.log(test);
    // console.log(test[0]);
    // if(test[0]=== undefined){
    //   alert('ppp');
    // }
    // return;

    var vm = this;
    vm.items = [];
    vm.published = true;

    vm.doAction = {
      publish: function () {
        alert('发布文章');
      }
    };

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

        api
          .studio
          .listnofinish()
          .then(function (res) {
            if (res.data.errNo !== 0) {
              //toaster.pop('error', '数据获取失败', res.data.errMsg)
            }
            else {
              for (var i = 0, len = res.data.result.length; i < len; i++) {
                res.data.result[i].statusText = window.data.publishStatus[res.data.result[i].status];
              }
              vm.items = res.data.result;
              vm.published = false;

            }
          });
      }
      else if (type === 'published' && window.dataStorage.user && (window.dataStorage.user.data !== undefined)) {
        api
          .studio
          .showcraft()
          .then(function (res) {
            // console.log(res.data);
            if (res.data.errNo == 700011) {
              vm.items = [];
              // toaster.pop('warning ', '数据获取失败', res.data.errMsg);
            } else if (res.data.errNo === 0) {
              vm.items = res.data.result;
            } else {
              // toaster.pop('error ', '数据获取错误', res.data.errMsg);

            }
          });
        vm.published = true;

      } else {
        toaster.pop('error', '请先登录!');
        $state.go('page.login');
      }

    };
    // 删除玉石

    vm.delcraft = function (craft_id) {

      var data = new Object();
      data.craft_id = craft_id;
      // console.log(data.craft_id);
      if (confirm("确定要删除该玉石数据?")) {
        api.studio.delcraft(data).then(function (res) {
          //alert("dsds");
          //console.log(res.data)
          if (res.data.errNo === 0) {
            // console.log(res.data);

            toaster.pop('success', "删除玉石成功");
            vm.showItems('published');
          }
          else {
            // console.log(res.data);
            // toaster.pop('error', "出错了", res.data.errMsg);
          }
        }, function (res) {
          // toaster.pop('error', "删除玉石失败!", res.data.errMsg);
        })
      }


    }
    vm.showItems('published');
    // 发布已经完成软文和时间轴的
    vm.publish = function (craft_id) {
      // alert('ok');
      var data = new Object();
      data.craft_id = craft_id;

      api.studio.publish(data).then(function (res) {
        //alert("dsds");
        //console.log(res.data)
        if (res.data.errNo === 0) {
          // console.log(res.data);

          toaster.pop('success', "发布成功");
          vm.showItems('published');
        } else if (res.data.errNo === 900010) {
          toaster.pop('warning', "雕件已发布");
          return;
        } else if (res.data.errNo === 900011) {
          toaster.pop('error', "雕件id不合法");
          return;
        } else if (res.data.errNo === 900012) {
          toaster.pop('error', "未创建软文");
          return;
        } else if (res.data.errNo === 900013) {
          toaster.pop('error', "未创建时间轴");
          return;
        }
        else {
          // error code
          // toaster.pop('error', "出错了", res.data.errMsg);
        }
      }, function (res) {
        // toaster.pop('error', "发布失败!", res.data.errMsg);
      })
    }

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
      text: 'http://app.bellwebwork.com/#/wap/show/' + window.dataStorage.user.data.studio_id + '/' + items.craft_id + '/1'
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
    // api.me().then(function (res) {
    //   if (res.data.errNo === 0) {//已经登录
    //     $state.go('dashboard');
    //     // console.log('已经登录');
    //     // console.log(window.dataStorage.user);
    //     // console.log(res.data);
    //   }
    // });
    vm.validate = validateReg;
    vm.form = {
      phone: '15212345698',
      passwd: '111111'
    };
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
          // toaster.pop('error', "出错了", res.data.errMsg);
        }

      });
    };
    //vm.login();
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
    vm.form = { user: '' };
    // alert('ok');
    //登录
    vm.login = function ($event) {
      $event.preventDefault();

      $http.post('/dataefasdfadsf', vm.form).then(function () {

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
        // else {
        //   toaster.pop('error', "出错了", res.data.errMsg);
        // }
      }, function (res) {
        // toaster.pop('error', "重置密码失败!", res.data.errMsg);
      })
    };
    vm.getVerifyCode = function () {
      // console.log(vm.form);return;
      // 定义按钮btn
      var btn = $("#sendVerifyBtn");

      // 定义发送时间间隔(s)
      var SEND_INTERVAL = 30;
      var timeLeft = SEND_INTERVAL;

      if (vm.form.user.phone) {
        var data = new Object();
        data.phone = vm.form.user.phone;
        vm.form.validation = true;
        api.user.getverify(data);
        // var temp = api.user.getverify(data);
        // console.log(temp);
      } else {
        toaster.pop('error', "请输入电话号码");
        return;
      }
      var timeCount = function () {
        $timeout(function () {
          if (timeLeft > 0) {
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
          // console.log(res.datxa);
          $state.go('page.login');
        }
        else {
          // toaster.pop('error', "出错了 forgotPwd", res.data.errMsg);
        }
      }, function (res) {
        // toaster.pop('error', "重置密码失败!", res.data.errMsg);
      })
    };


  }

  /**
   * 创建玉石
   * @param $scope
   * @param $log
   * @constructor
   */
  function CreateJadeCtrl($stateParams, $mdDialog, api, toaster, $state, $timeout) {

    var vm = this,
      aid = $stateParams.aid,
      craft_id = $stateParams.craft_id,
      isUpdate = (aid !== undefined && aid !== '') && (craft_id !== undefined && craft_id !== '');

    //编辑器
    vm.editor = {
      config: {
        UEDITOR_HOME_URL: '/vendors/ueditor1.4.3.2/',
        autoHeightEnabled: true,
        autoFloatEnabled: true,
        initialFrameHeight: 120,
        toolbars: [
          ['fullscreen', 'source', 'undo', 'redo', 'bold'],
          ['date', 'time', 'imagecenter']
        ],
      }
    }

    vm.timeline = [
      {
        img: [],
        describe: '',
        name: '原石',
        className: 'b-info'
      },
      {
        img: [],
        describe: '',
        name: '设计',
        className: ''
      },
      {
        img: [],
        describe: '',
        name: '粗绘',
        className: 'b-primary',
      },
      {
        img: [],
        describe: '',
        name: '细绘',
        className: 'b-white'
      },
      {
        img: [],
        describe: '',
        name: '打磨抛光',
        className: 'b-white'
      },
      {
        img: [],
        describe: '',
        name: '落款证书',
        className: 'b-white'
      },
      {
        img: [],
        describe: '',
        name: '结束（物流）',
        className: 'b-white'
      }

    ];

    vm.form = {
      craft_id: $stateParams.craft_id,
      publish: 0,
      imgurl: 'http://hdn.xnimg.cn/photos/hdn321/20130612/2235/h_main_NNN4_e80a000007df111a.jpg'//默认图
    };
    if (isUpdate) {
      vm.form.aid = aid;
    }
    vm.tabs = {
      selectedIndex: 0
    };

    var getcid = function () {
      api
        .studio
        .getcid()
        .then(function (res) {
          if (res.data.errNo === 0 && (res.data.result.craft_id !== undefined)) {
            //console.log('res.data.result');
            //console.log(res);
            vm.form.craft_id = res.data.result.craft_id;
            //console.log('vm.form.craft_id in getcid');
            //console.log(vm.form.craft_id);
          } else {
            // toaster.pop('error', '获取雕件id失败', '正在重新获取,错误信息:' + res.data.errMsg);
            // if (res.data.errNo !== 100012) {
            setTimeout(function () {
              getcid();
            }, 200);
          }
          // }
        });
    };

    if (isUpdate) {
      console.log('isUpdate');
      api
        .studio
        .modifyArticle({
          params: {
            aid: vm.form.aid,
            craft_id: vm.form.craft_id
          }
        }).then(function (res) {
          if (res.data.errNo === 0) {
            var data = res.data.result;
            if (typeof data.createDate === 'string' && data.createDate.length >= 10) {
              data.createDate = new Date(data.createDate);
            }
            else {
              delete data.createDate;
            }
            vm.form = data;
          }
          else {
            // toaster.pop('error', '出错了', res.data.errMsg);
          }
        }, function (err) {

        });
    } else {
      getcid();
      console.log('getcid');
    }
    // console.log("vm.form.craft_id"+vm.form.craft_id);
    // 获取时间轴相关信息
    api.studio.modifyTime({
      params: {
        craft_id: vm.form.craft_id
      }

    }).then(function (res) {
      console.log('获取时间轴相关信息');
      console.log(res);
      // 将新的时间轴信息录入数组当中
      // vm.craft_id = vm.form.craft_id;
      if (res.data.result.timeLine) { //  需要重新写逻辑 这样写不严谨
        vm.timeline = res.data.result.timeLine;
      }
    });


    //基本资料部分
    vm.submit = function () {
      var msg = '';
      if (isUpdate) {//修改
        //1:发布   0:预览
        vm.form.publish = 1;
        msg = '修改成功';
      } else {
        msg = '添加成功';
      }
      console.log(vm.form.craft_id);
      console.log(vm.form);
      // return;
      api.studio
        .upData(vm.form)
        .then(function (res) {
          if (res.data.errNo === 0) {
            toaster.pop('success', '成功', msg);
            vm.tabs.selectedIndex = 1;

            // vm.form = {};//reset  不放在这  change by ycz 因为timeline还需要用到craft_id

          } else {
            alert("vm.submit 出错啦");

          }
        }, function (res) {
          console.log(res);

        });

    };

    // 打开在线相册
    vm.showPhotoAlbum = function ($event) {

      $mdDialog.show({
        controller: 'photoAlbumCtrl',
        controllerAs: 'vm',
        templateUrl: 'photoAlbum.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        locals: {
          items: { craft_id: vm.form.craft_id }
        }
        //clickOutsideToClose: true
      }).then(function (items) {
        //选中了
        if (angular.isArray(items)) {
          //vm.editor.dom 百度编辑器
          // alert('选中了' + items.length + '个');
          // alert('暂时只用选中的第一个，后台现在也只用一个，如果没有就默认给一个');
          console.log(items[0].img_url);
          vm.form.imgurl = items[0].img_url;
          vm.editor.dom.execCommand('inserthtml', '<img src="' + items[0].img_url + '" style="display:block;width:80%;max-width:400px;margin-left:auto;margin-right:auto;"/>');
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
          items: { index: index },

        }
        //clickOutsideToClose: true  
      }).then(function (answer) {
        //  console.log("answer");
        // console.log(answer);
        // return;

        if (answer && (answer[0] !== undefined)) {
          vm.timeline[index].img.push(answer[0]);
        } else {
          // console.log("answer");
          // console.log(answer);
          //  toaster.pop('error', '图片为空,这是不应该出现的');

          return;
        }


      }, function (answer) {
        alert('error in vm.upload');
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
        //console.log(answer);
        vm.timeline[index].describe = answer.txt;
      }, function () {

      });

    };

    // 更新时间轴信息
    vm.upTimeData = function () {

      // console.log(timeLineData); 
      // console.log(vm.craft_id); 
      // var data = {
      //   craft_id: vm.craft_id,
      //   timeLine: {
      //     timeline: vm.timeline
      //   }
      // };
      var data = new Object();
      data.craft_id = vm.form.craft_id;
      //data.timeLine =  timeLineData;//vm.timeline; 
      data.timeLine = vm.timeline; //timeLineData;

      console.log(data);
      // var data = {
      //  craft_id: vm.craft_id,
      //  timeLine:  vm.timeline
      // }


      api.studio.upTimeData(data).then(function (res) {
        console.log(res);
        if (res.data.errNo === 0) {
          toaster.pop('success', '更新时间轴成功');
          $state.go('dashboard');
        }
      }, function (res) {
        // console.log(res);
        // toaster.pop('error', '出错了', res.data.errMsg);

      });
    }
  }

  //上传弹框
  function uploadCtrl($timeout, $mdDialog, items, Upload, api, toaster, $interval) {

    var vm = this;
    vm.form = [];
    vm.uploadValidation = false;
    // vm.loadInfo = '图片加载中...';
    vm.backgroundUrl = 'images/loading.gif';
    //vm.backgroundUrl = 'images/success.png';

    vm.cancel = function () {
      $mdDialog.hide();
    };
    vm.save = function () {
      $mdDialog.hide(vm.form);
    };
    vm.uploadFiles = function ($files) {
      vm.files = $files;
      //console.log(vm.files[0]);
      if (vm.files && vm.files.length) {
        Upload.upload({
          url: api.studio.uploaduyimg(),
          file: vm.files[0],
          sendFieldsAs: 'form'
        }).then(function (response) {
          if (response.data.errNo === 0) {
            vm.form.push(response.data.result.img_url);
            vm.uploadValidation = true;
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


    var vm = this;
    vm.form = {};

    vm.save = function () {
      $mdDialog.hide(vm.form);
    };

    vm.cancel = function () {
      $mdDialog.hide();
    };


    // // 获取时间轴相关信息
    //   api.studio.modifyTime({
    //      params: {
    //       craft_id: vm.form.craft_id
    //      }

    //   }).then(function(res){
    //       console.log(res);
    //       // 将新的时间轴信息录入数组当中
    //       vm.craft_id = vm.form.craft_id;
    //       vm.timeline = res.data.result.timeLine;

    //       // 新修改的数据
    //       console.log('新的数据');
    //       console.log(vm.form);return;
    //       vm.timeline[0].img = vm.form.img;
    //       vm.timeline[0].describe = vm.form.description;
    //       vm.timeline[0].name = vm.form.name;
    //           // 更新时间轴
    //       api.studio.upTimeData({
    //          params: {
    //           craft_id: vm.craft_id,
    //           timeLine: vm.timeline
    //          }
    //       }).then(function(res){
    //           console.log(res);
    //       },function(res){
    //           console.log(res);

    //       });
    //       // return;







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
          type: 1 // 文章介绍
        }
      }).then(function (res) {
        vm.article = res.data.result[0];
        console.log(res);
      });

    api
      .studio
      .showonecraft({
        params: {
          craft_id: $stateParams.id,
          type: 2 // 时间轴
        }
      }).then(function (res) {
        vm.timeLine = res.data.result;
        console.log('timeLine');
        console.log(vm.timeLine);
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

  }

  /**
   * 显示在线相册 
   * @param $mdDialog
   * @param items
   */
  function photoAlbumCtrl($mdDialog, $timeout, items, api, Upload) {
    var vm = this;
    vm.files = [];//上传的图片
    vm.showUpload = false;
    vm.selectItem = [];
    // { id: 1, url: 'images/assets/600_400-1.jpg' }
    vm.items = [];//库存图片
    //todo 加缓存
    api
      .studio
      .allimges()
      .then(function (res) {
        if (res.data.errNo === 0) {
          vm.items = res.data.result[0];
        }
      });

    //切换选中
    vm.selectItemFun = function (item) {
      if (item.active) {
        vm.selectItem = vm.selectItem.slice(vm.selectItem.indexOf(item), 1);
        item.active = false;
      } else {
        item.active = true;
        vm.selectItem.push(item);
      }
    };

    vm.cancel = function () {
      $mdDialog.hide();
    };
    //选择文件就上传
    vm.upload = function ($files) {
      vm.showUpload = true;

      console.log($files);
      if ($files && $files.length) {
        // for (var i = 0; i < $files.length; i++) {
        //   Upload.upload({url: api.craft.uploadarticleimages(), data: {file: $files[i]}, ...})...;
        // }
        vm.files = {
          craft_id: items.craft_id
        };
        for (var i = 0; i < $files.length; i++) {
          vm.files['file' + i] = $files[i];
        }
        Upload.upload({
          url: api.craft.uploadarticleimages(),
          sendFieldsAs: 'form',
          data: vm.files
        }).then(function (response) {
          if (response.data.errNo === 0) {
            var _result = [];
            for (var url in response.data.result) {
              _result.push({
                img_url: response.data.result[url]
              });
            }
            $timeout(function () {
              Array.prototype.push.apply(vm.items, _result);
              console.log(vm.items);
            });
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

    vm.save = function () {
      //console.log('选择的图片',vm.selectItem);
      $mdDialog.hide(vm.selectItem);
    };

  }
})();
