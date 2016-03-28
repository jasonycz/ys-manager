(function () {
  'use strict';

  angular.module('app.page')
    .controller('invoiceCtrl', ['$scope', '$window', invoiceCtrl])
    .controller('authCtrl', ['$scope', '$http', authCtrl])
    .controller('ProfileController', ['$scope', '$state', ProfileController]);

  function ProfileController($scope, $state) {
    $scope.create = function () {
      $state.go('page/blank')
    }
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

  function authCtrl($scope, $http) {

    var vm = this;
    vm.form = {};

    vm.login = function ($event) {
      $event.preventDefault();

      $http.post('/dataefasdfadsf', vm.form).then(function () {
        console.log(arguments)
      });
    };

    vm.signup = function () {
      alert(2)
    };

    vm.update = function ($event) {
      $event.preventDefault()

      var phone = $scope.phone;
      var password = $scope.password;
      var repassword = $scope.repassword;

      if (!phone || phone.length !== 11) {
        alert('请输入正确的 11 位手机号')
        return
      }

      if (!password || password.length < 6) {
        alert('密码必须大于或等于 6 位')
        return
      }

      if (repassword !== password) {
        alert('两次密码输入必须一致')
        return
      }

      $http.post('/api/updatepassword', {
        phone: phone,
        password: password
      }).then(function () {
        // todo something.....
      })
    }
  }

})();
