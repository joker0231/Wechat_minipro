Page({
    data: {},
    onLoad: function (options) {

    },

    clickCheckIn: function() {
      wx.navigateTo({
        url: '/pages/mine/checkIn/index',
      })
    },

    clickLogout: function() {
      wx.reLaunch({
        url: '/pages/login/index/index',
      })
    },

    clickProgress: function() {
      wx.navigateTo({
        url: '/pages/mine/progress/index',
      })
    }
});