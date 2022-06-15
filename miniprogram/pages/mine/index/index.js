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
      // wx.navigateTo({
      //   url: '/pages/mine/message/index',
      // })
      // 这里改啦 再取TUI自带的消息列表里加入tab
      wx.navigateTo({
        url: '/TUI-CustomerService/pages/TUI-Conversation/conversation/conversation'
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