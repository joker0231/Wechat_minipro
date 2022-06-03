const userStore = require("../../../stores/user-store")

Page({
    data: {
      userData: {}
    },
    onShow: function (options) {
      // ceshi
      this.setData({
        userData: userStore.getUserData()
      })



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
        url: '/pages/mine/post_history/index',
      })
    },

    clickToSpace: function() {
      wx.navigateTo({
        url: '/pages/mine/space/index',
      })
    },

    clickToRecord: function() {
      wx.navigateTo({
        url: '/pages/mine/record/index',
      })
    },

    clickToFriendList: function() {
      wx.navigateTo({
        url: '/pages/mine/friendList/index',
      })
    }
});