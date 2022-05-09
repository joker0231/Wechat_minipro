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
    },

    clickFavourite: function() {
      wx.navigateTo({
        url: '/pages/mine/favourite/index',
      })
    },

    clickEdit: function() {
      wx.navigateTo({
        url: '/pages/mine/edit/index',
      })
    },


    clickMessage: function() {
      wx.navigateTo({
        url: '/pages/mine/message/index',
      })
    },

    clickPost: function() {
      wx.navigateTo({
        url: '/pages/mine/post/index',
      })
    }
});