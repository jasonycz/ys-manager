/**
 * 数据相关文件
 */

//存放全局数据
(function (window) {

  window.dataStorage = {};
  dataStorage.user = {
    data: undefined,
    init: function () {
      var data = window.sessionStorage.getItem('ys-user');
      if (data) {
        dataStorage.user.data = JSON.parse(data)
      }
    },
    save: function (data) {
      dataStorage.user.data = data;
      window.sessionStorage.setItem('ys-user', JSON.stringify(data));
    },
    clear: function () {
      dataStorage.user.data = undefined;
      window.sessionStorage.removeItem('ys-user');
    }
  };
  
  dataStorage.init = function () {
    dataStorage.user.init()
  };

  window.dataStorage.init();

})(window);

//全局通用数据
(function (window) {

  window.data = {
      craftType:{},//雕件类型
      craftSize:{},//雕件大小
      craftViewType:{
        1:'时间轴',
        2:'文章'
      },
      applyStatus:{
        2:'禁止',
        1:'启用'
      },
      publishStatus:{
        6:'未发布时间轴',
        7:'未发布软文',
        8:'都完成待发布'
      } 
      
  };


})(window);
