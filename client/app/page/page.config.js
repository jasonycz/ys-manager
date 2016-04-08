"use strict";

/**
 * @description 页面相关配置文件
 * @author yingyujia
 * @time 16/4/6
 */

(function () {
  'use strict';

  angular
    .module('app.page')
    .factory('api', ['$http', api]);

  function api($http) {

    var baseUrl = 'http://localhost/api';
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
      return $http.post(baseUrl + '/me')
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
      return $http.post(baseUrl + '/user/login', data)
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
      return $http.post(baseUrl + '/user/resetbyphone  ', data)
    };

    /**
     * 获取验证码
     * @param data
     * @returns {*}
     */
    api.user.getverify = function (data) {
      return $http.post(baseUrl + '/user/getverify   ', data)
    };

    /**
     * 管理员为其他用户设置权限
     * @param data
     * @returns {*}
     */
    api.user.setpower = function (data) {
      return $http.post(baseUrl + '/user/setpower   ', data)
    };

    /**
     * 工作室申请
     * @returns {*}
     */
    api.studio.apily = function () {
      return $http.post(baseUrl + '/studio/apily', data)
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
     * @returns {*}
     */
    api.studio.showonecraft = function (craft_id, type) {
      return $http.get(baseUrl + '/studio/showonecraft')
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
})();
