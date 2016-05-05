(function (window) {
  'use strict';

  angular.module('app.core')
    .factory('appConfig', [appConfig])
    .factory('api', ['$http', api])
    .config(['$httpProvider', preAjax])
    .config(['$mdThemingProvider', mdConfig])
    .run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.app = {
          loading: true,
          title: '工作室'
        };
      }
    ]
    );

  function appConfig() {
    var pageTransitionOpts = [
      {
        name: 'Fade up',
        "class": 'animate-fade-up'
      }, {
        name: 'Scale up',
        "class": 'ainmate-scale-up'
      }, {
        name: 'Slide in from right',
        "class": 'ainmate-slide-in-right'
      }, {
        name: 'Flip Y',
        "class": 'animate-flip-y'
      }
    ];

    var main = {
      brand: '工作室后台',
      name: 'Lisa',
      year: new Date().getFullYear(),
      layout: 'wide',                                 // 'boxed', 'wide'
      menu: 'vertical',                               // 'horizontal', 'vertical'
      isMenuCollapsed: false,                          // true, false
      fixedHeader: true,                              // true, false
      fixedSidebar: true,                             // true, false
      pageTransition: pageTransitionOpts[0],          // 0, 1, 2, 3... and build your own
      skin: 'bg-white'
    };
    /*
     bg-white
     bg-dark
     bg-primary
     bg-success
     bg-info
     bg-warning
     bg-danger
     */

    var color = {
      primary: '#009688',
      success: '#8BC34A',
      info: '#00BCD4',
      infoAlt: '#7E57C2',
      warning: '#FFCA28',
      danger: '#F44336',
      text: '#3D4051',
      gray: '#EDF0F1'
    };

    return {
      pageTransitionOpts: pageTransitionOpts,
      main: main,
      color: color
    }
  }

  function mdConfig($mdThemingProvider) {
    var cyanAlt = $mdThemingProvider.extendPalette('cyan', {
      'contrastLightColors': '500 600 700 800 900',
      'contrastStrongLightColors': '500 600 700 800 900'
    });
    var lightGreenAlt = $mdThemingProvider.extendPalette('light-green', {
      'contrastLightColors': '500 600 700 800 900',
      'contrastStrongLightColors': '500 600 700 800 900'
    });

    $mdThemingProvider
      .definePalette('cyanAlt', cyanAlt)
      .definePalette('lightGreenAlt', lightGreenAlt);


    $mdThemingProvider.theme('default')
      .primaryPalette('teal', {
        'default': '500'
      })
      .accentPalette('cyanAlt', {
        'default': '500'
      })
      .warnPalette('red', {
        'default': '500'
      })
      .backgroundPalette('grey');
  }

  function api($http) {


    var baseUrl = 'http://web.bellwebwork.com/';
    //  var baseUrl = 'http://101.201.198.27';
    //var baseUrl = location.protocol + '//' + location.hostname + '/api';
    var api = {
      studio: {},
      user: {},
      wap: {}
    };

    /**
     * 检查用户是否登录
     * @returns {*}
     */
    api.me = function () {
      return $http.post(baseUrl + '/api/me');
    };

    /**
     * 检查用户名是否存在
     * @param uname 用户名
     */
    api.user.exists = function (data) {
      return $http.post(baseUrl + '/studio/exists', data);
    };

    /**
     * 用户登录
     * @param data
     * @returns {*}
     */
    api.user.login = function (data) {
      return $http.post(baseUrl + '/user/login', data);
    };

    /**
     * 用户推出登录
     * @param data
     * @returns {*}
     */
    api.user.logout = function (data) {
      return $http.post(baseUrl + '/user/logout', data);
    };

    /**
     * 修改密码
     * @returns {*}
     */
    api.user.resetpwd = function (data) {
      return $http.post(baseUrl + '/user/resetpwd', data)
    };

    /**
     * 重置密码通过手机
     * @param data
     * @returns {*}
     */
    api.user.resetbyphone = function (data) {
      return $http.post(baseUrl + '/user/resetbyphone', data);
    };

    /**
     * 获取验证码
     * @param data
     * @returns {*}
     */
    api.user.getverify = function (data) {
      return $http.post(baseUrl + '/user/getverify', data);
    };

    /**
     * 管理员为其他用户设置权限
     * @param data
     * @returns {*}
     */
    api.user.setpower = function (data) {
      return $http.post(baseUrl + '/user/setpower', data);
    };

    /**
     * 工作室申请
     * @returns {*}
     */
    api.studio.apily = function () {
      return $http.post(baseUrl + '/studio/apily', data);
    };

    /**
     * PC端工作室发布作品展示
     * @returns {*}
     */
    api.studio.showcraft = function (data) {
      return $http.get(baseUrl + '/studio/showcraft', data);
    };

    /**
     * PC端查看单个作品
     * @param {int} craft_id 雕件id
     * @param {int} type 查看类型
     * @returns {any}
     */
    api.studio.showonecraft = function (data) {
      return $http.get(baseUrl + '/studio/showonecraft', data);
    };

    /**
     * 雕件未发布作品展示
     * @returns {*}
     */
    api.studio.listnofinish = function () {
      return $http.get(baseUrl + '/studio/listnofinish');
    };

    /**
     * 用户单击创建按钮，返回雕件id
     * @param craft_id
     * @param type
     * @returns {*}
     */
    api.studio.getcid = function () {
      return $http.get(baseUrl + '/studio/getcid')
    };

    /**
     * 新建雕件或者修改雕件文章
     *  @param data {Aid,Title,author,createdate,content,craft_id,publish}
     * @returns {*}
     */
    api.studio.upData = function (data) {
      return $http.post(baseUrl + '/studio/upData', data);
    };

    /**
     * 删除一个雕件
     * @param data
     * @returns {*}
     */
    api.studio.delcraft = function (data) {
      return $http.post(baseUrl + '/studio/delcraft', data);
    };

    /**
     * 新建雕件或者修改雕件时间轴
     * @param Aid 文章id
     * @param Title 文章标题
     * @param author 文章作者
     * @param createdate 文章创建时间
     * @param content 文章内容
     * @param craft_id 雕件id
     * @param publish 1：发布,0预览
     * @returns {*}
     */
    api.studio.upTimeData = function (data) {
      return $http.post(baseUrl + '/studio/upTimeData', data)
    };

    /**
     * 时间轴图片上传
     * @returns {string}
     */
    api.studio.uploaduyimg = function () {
      return baseUrl + '/studio/uploaduyimg';
    };

    /**
     * 雕件软文修改页面
     * @param data {aid 文章id,craft_id雕件id}
     * @returns {*}
     */
    api.studio.modifyArticle = function (data) {
      return $http.get(baseUrl + '/studio/modifyArticle', data)
    };

    /**
     * 时间轴删除图片
     * @param url
     * @returns {*}
     */
    api.studio.modifyTime = function (data) {
      return $http.get(baseUrl + '/studio/modifyTime', data)
    };

    /**
       * 雕件发布页面
       * @param data {craft_id雕件id}
       * @returns {*}
       */
    api.studio.publish = function (data) {
      return $http.post(baseUrl + '/studio/publish', data)
    };
    /**
     * 手机端预览雕件
     * @param {int} craft_id 雕件id
     * @returns {*}
     */
    api.wap.show = function (data) {
      return $http.get(baseUrl + '/wap/show', data)
    };

    /**
     * 手机端预览所有发布作品
     * @returns {*}
     */
    api.wap.showall = function (data) {
      return $http.get(baseUrl + '/wap/showall', data)
    };

    /**
     * 手机端微信分享代码
     * @returns {*}
     */
    api.wap.sharesdk = function () {
      return $http.get(baseUrl + '/wap/sharesdk')
    };

    return api;

  }

  function preAjax($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push(['$rootScope', 'toaster', function ($rootScope, toaster) {
      return {
        request: function (config) {

          //如果是请求api,就改成post

          //form 表单提交方式
          if (config.method === 'post') {
            //config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            //config.headers['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            //config.headers['Cache-Control']='no-cache';
            //config.headers['Pragma']='no-cache';

            $rootScope.$broadcast('preloader:active');
          }


          return config;
        },
        response: function (response) {

          //console.log(response);
          $rootScope.$broadcast('preloader:hide');

          //不是请求 api/me 的时候,出现未登陆错误
          if (response.data.errNo && response.data.errNo !== 0 && response.config.url.indexOf('/api/me') === -1) {
            //console.log(response);
            toaster.pop('error', '出错了', response.data.errMsg);
          }

          if (response.data.errNo === 100012) {
            window.location.href = '/#/page/login';
          }

          return response;
        },
        responseError: function (response) {
          console.log(response);
          toaster.pop('error', '出错了', '状态码：' + response.status);
          return response;
        }
      }
    }]);
  }

})(window);

