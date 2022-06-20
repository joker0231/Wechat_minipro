const userStore = require('../../../stores/user-store');
const { default: fetchYun } = require('../../../utils/fetchYun');
var app = getApp()

Page({
    data: {
      reply_data: [],
      hasUserInfo: false,
    nickName: '',
    msg: [],
    empty_show: true,
    now: '',
    height: app.globalData.height 
    },

      // 点击消息列表跳转到聊天详情页（需要把列表页的头像传过去，因为详情获取的数据里面没有聊天头像）
  contactsClick(e) {
    var conversationID= e.currentTarget.dataset.conversationid // 当前会话的人的conversationID
    var avatar= e.currentTarget.dataset.avatar
    var name= e.currentTarget.dataset.name
    // wx.navigateTo({
    //   url: '/subpackages/message-detail/index?conversationID=' + conversationID + '&avatar=' + avatar  + '&name=' + name,
    // })
  },
  // 获取会话列表 （必须要在SDK处于ready状态调用（否则会报错））
  initRecentContactList() {
    var that = this
    // 拉取会话列表
    var tim = app.globalData.tim
    let promise = tim.getConversationList();
    if(!promise) {
      wx.showToast({
        title: '登录已过期，需要重新登录噢～',
        icon: 'none',
        duration: 3000
      })
      return
    }
    promise.then(function(imResponse) {
      console.log('会话列表')
      console.log(imResponse)
      // 如果最后一条消息是自定义消息的话，处理一下data
      const conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
      conversationList.forEach(e => {
        if(e.lastMessage.type == 'TIMCustomElem') {
          var data = e.lastMessage.payload.data
          var new_data = ''
          if(typeof(data) == 'string' && data) {
            new_data = JSON.parse(data)
          }
          e.lastMessage.payload.data = new_data
        }
      })
      that.setData({
        msg: conversationList,
        empty_show: conversationList && conversationList.length>0 ? false : true
      })
      var number = 0
      conversationList.forEach(e => {
        number = number + e.unreadCount
      })
      if(number>0) {
        console.log("有未读信息")
      }
    }).catch(function(imError) {
      wx.showToast({
        title: 'getConversationList error:' + imError,
        icon: 'none',
        duration: 3000
      })
      console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
    })
  },

  //腾讯云im的登录
  loginIm() {
    const userID = app.globalData.userID
    const userSig = app.globalData.userSig
    var tim = app.globalData.tim
    let promise = tim.login({userID: userID, userSig: userSig});
    promise.then(function(imResponse) {
      console.log(imResponse)
      console.log('登录成功')
      wx.setStorageSync('isImLogin', true)
      app.globalData.isImLogin = true
    }).catch(function(imError) {
      wx.showToast({
        title: 'login error' + imError,
        icon: 'none',
        duration: 3000
      })
      console.warn('login error:', imError); // 登录失败的相关信息
    })
  },

    onLoad: function (options) {
      
      
      fetchYun('communityFunctions', {
        type: "getReplyByUserId",
        userId: userStore.getUserData()._id
      }).then((resp) => {
        console.log(resp, '想要查看的消息')
        this.setData({
          reply_data: resp.result
        },()=>{
          console.log(this.data.reply_data)
        })
      })

    },

    onShow: function () {
      if (app.globalData.isImLogin) {
        // 已经登录了SDK处于read状态
        this.setData({
          hasUserInfo: true
        })
        // 由于登录是写在会话列表的 因此如果已经登录 （SDK处于ready状态）就直接获取会话列表（会话列表函数在下面会话列表里整体贴）
        this.initRecentContactList()
      } else {
        if (!app.globalData.isImLogin) {
          this.setData({
            hasUserInfo: true
          })
          // 登录im
          this.loginIm()
        } else {
          console.log('im登录不成功')
          this.setData({
            hasUserInfo: false
          })
        }
      }
    },
});