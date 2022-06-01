// pages/mine/friendList/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navState: 0,
    userId: '',
    hasUserInfo: false,
    userSign: '',
    nickName: '',
    msg: [],
    empty_show: true,
    now: '',
    height: app.globalData.height 
  },
  
  navSwitch: function(e) {
    // console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    this.setData({
        navState:index
    })
  },

    // 点击消息列表跳转到聊天详情页（需要把列表页的头像传过去，因为详情获取的数据里面没有聊天头像）
  contactsClick(e) {
    var conversationID= e.currentTarget.dataset.conversationid // 置业顾问的conversationID（当前会话的人）
    var avatar= e.currentTarget.dataset.avatar
    var name= e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/subpackages/message-detail/index?conversationID=' + conversationID + '&avatar=' + avatar  + '&name=' + name,
    })
  },
  // 获取会话列表 （必须要在SDK处于ready状态调用（否则会报错））
  initRecentContactList() {
    var that = this
    // 拉取会话列表
    var tim = app.globalData.tim
    let promise = tim.getConversationList();
    if(!promise) {
      util.sLoadingHide()
      wx.showToast({
        title: 'SDK not ready',
        icon: 'none',
        duration: 3000
      })
      return
    }
    promise.then(function(imResponse) {
      util.sLoadingHide()
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
        wx.setTabBarBadge({
          index: 2,
          text: number.toString()
        })
      } else {
        wx.hideTabBarRedDot({
          index: 2
        })
      }
    }).catch(function(imError) {
      util.sLoadingHide()
      wx.showToast({
        title: 'getConversationList error:' + imError,
        icon: 'none',
        duration: 3000
      })
      console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})