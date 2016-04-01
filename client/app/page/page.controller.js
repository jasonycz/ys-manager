(function () {
    'use strict';

    angular.module('app.page')
      .controller('invoiceCtrl', ['$scope', '$window', invoiceCtrl])
      .controller('authCtrl', ['$scope', '$http', 'validateReg', authCtrl])
      .controller('ProfileController', ['$scope', '$state', ProfileController])
      .controller('uploadCtrl', ['$mdDialog', 'items', 'FileUploader', uploadCtrl])
      .controller('CreateJadeCtrl', ['$stateParams', 'FileUploader', CreateJadeCtrl]);

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
    function CreateJadeCtrl($stateParams, FileUploader) {

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
      self.upload = function () {

        var items = {
          url: 'http://',
          filters: {
            name: 'imageFilter',
            fn: function (item, options) {

              var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
          }
        }




      }
    };

    function uploadCtrl($mdDialog, items, FileUploader) {
      var self = this;
      var uploader = self.uploader = new FileUploader({
        url: items.url
      });

      if (items.filters) {
        uploader.filters.push(items.filters);
      }

      uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
      };
      uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
      };
      uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
      };
      uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
      };
      uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
      };
      uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
      };
      uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
      };
      uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
      };
      uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
      };
      uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
      };
      uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
      };


    }

  })();
