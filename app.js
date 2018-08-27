//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = swan.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    swan.setStorageSync('logs', logs);
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      //调用登录接口
      swan.login({
        success: function () {
          swan.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          });
        }
      });
    }
  },
  globalData: {
    userInfo: null
  }
});