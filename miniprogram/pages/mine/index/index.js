const userStore = require("../../../stores/user-store")
const app = getApp()
Page({
    data: {
      userData: {},
      unreadCount: 0
    },
    onShow: function (options) {
      // ceshi
      this.setData({
        userData: userStore.getUserData()
      })

      let unreadCount = 0
      wx.$TUIKit.getConversationList().then(res=>{
        console.log('查询自己的消息', res)
        res.data.conversationList.forEach((e)=>{
          unreadCount += e.unreadCount;
        })

         // 分两次 避免影响UserData上面的
        this.setData({
          unreadCount
        }, ()=>{
          console.log(this.data.unreadCount, '未读消息个数')
        })
      })

     


    },

    clickCheckIn: function() {
      wx.navigateTo({
        url: '/pages/mine/checkIn/index',
      })
    },

    clickLogout: function() {
      wx.$TUIKit.logout().then(() => {
        wx.clearStorage();
        app.globalData.expiresIn = ''
        app.globalData.sessionID = ''
        app.globalData.userInfo = {
          userID: '',
          userSig: '',
          token: '',
          phone: '',
        }
        app.globalData.userProfile = null
        wx.reLaunch({
        url: '/pages/login/index/index',
      })
      });
      
    },

    clickProgress: function() {
      wx.navigateTo({
        url: '/EC-Charts/pages/progress/index',
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
        url: '/EC-Charts/pages/space/index',
      })
    },

    clickToRecord: function() {
      wx.navigateTo({
        url: '/pages/mine/record/index',
      })
    },

    clickToFriendList: function() {
      wx.navigateTo({
        url: '/TUI-CustomerService/pages/friendList/index',
      })
    }
});