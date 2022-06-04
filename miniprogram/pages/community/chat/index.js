import TIM from 'tim-wx-sdk'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',//发送的文字消息内容
    myMessages: [],//消息
    selToID:0,
    scrollTop: 0,
    cardId:'',//卡片id
    type:'',//卡片类型
    height:'',
    complete:0,//默认为有历史记录可以拉取
    is_lock:true,//发送按钮防抖
    nav_title: '',
    tim: '',
    userSign: '',
    userId: '', // 自己的id
    friendID: '', // 好友的id
    msgList: app.globalData.msgList,
    friendAvatarUrl: '',
    top_height: app.globalData.height,
    isCompleted: false,
    nextReqMessageID: '',
    more_text: '下拉查看更多历史信息',
    isSuperSend: false,
    isDetail: false,
    inputHeight: 0,
    inputShow:true,
    focus:false,
    adjust: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中...',
      icon: 'none'
    })
    that.setData({
      friendID: options.friendID,
      friendAvatarUrl: options.avatar,
      cardId: options.cardId || '',
      type: options.type, 
      nav_title: options.name,// 设置头部title(自定义的)
      isDetail: true
    })
    wx.setNavigationBarTitle({
      title: options.name
    })
    // 滚动到底部
    that.pageScrollToBottom()
    wx.event.on('testFunc',(e,newMsgForm)=>{
      console.log('testFunc')
      if((newMsgForm === options.friendID) && app.globalData.isDetail) {
        var newmsg = app.globalData.myMessages[that.data.friendID]
        if (newmsg) {
          newmsg.forEach(e => {
            if(e.type == 'TIMCustomElem') {
              if(typeof(e.payload.data) == 'string' && e.payload.data) {
                var new_data = JSON.parse(e.payload.data)
                e.payload.data = new_data
              }
            }
            if(!e.isRead) {
              that.setData({
                myMessages: that.data.myMessages.concat(newmsg)
              })
            }
          })
        }
        console.log(that.data.myMessages)
        that.setMessageRead()
        that.pageScrollToBottom()
      }
    })
    // watch.setWatcher(that); // 设置监听器，建议在onLoad下调用
    if(app.globalData.isImLogin) {
      console.log('登录了')
      // 获取消息列表
      that.getMsgList()
    } else {
      console.log('未登录')
      wx.showToast({
        title: '登录已过期，需要重新登录噢～',
        icon: 'none',
        duration: 3000
      })
    }
  },
  watch:{
    myMessages:function(newVal,oldVal){
      console.log(newVal,oldVal)
    }
  },
  inputFocus(e) {
    console.log(e)
    var inputHeight = 0
    if (e.detail.height) {
      inputHeight = e.detail.height
    }
    this.setData({
      inputHeight: inputHeight
    })
    this.pageScrollToBottom()
  },
  inputBlur(e) {
    this.setData({
      inputHeight: 0,
    })
  },

  getMsgList() {
    console.log('获取会话列表')
    var that = this
    var tim = app.globalData.tim
    // 拉取会话列表
    var params = {
      friendID: that.data.friendID, 
      count: 15,
      nextReqMessageID: that.data.nextReqMessageID
    }
    let promise = tim.getMessageList(params);
    promise.then(function(imResponse) {
      console.log('会话列表')
      const messageList = imResponse.data.messageList; // 消息列表。
      // 处理自定义的消息
      messageList.forEach(e => {
        if(e.type == 'TIMCustomElem') {
          if(typeof(e.payload.data) == 'string' && e.payload.data) {
            var new_data = JSON.parse(e.payload.data)
            e.payload.data = new_data
          }
        }
      })
      const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
      const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
      // 将某会话下所有未读消息已读上报
      that.setMessageRead()
      that.setData({
        myMessages: messageList,
        isCompleted: isCompleted,
        nextReqMessageID: nextReqMessageID,
        more_text: isCompleted ? '没有更多了': '下拉查看更多历史信息'
      })
      wx.hideLoading()
      that.pageScrollToBottom()
    }).catch(function(imError) {
      console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
    });
  },
  
  // 下来加载更多聊天历史记录
  getMoreMsgList() {
    wx.hideLoading()
    // console.log('获取会话列表')
    var tim = app.globalData.tim
    var that = this
    // 拉取会话列表
    var params = {
      friendID: that.data.friendID, 
      count: 15,
      nextReqMessageID: that.data.nextReqMessageID
    }
    let promise = tim.getMessageList(params);
    promise.then(function(imResponse) {
      // console.log('下拉获取会话列表')
      // 处理自定义的消息
      imResponse.data.messageList.forEach(e => {
        if(e.type == 'TIMCustomElem') {
          if(e.payload.data) {
            var new_data = JSON.parse(e.payload.data)
            e.payload.data = new_data
          }
        }
      })
      const messageList = imResponse.data.messageList.concat(that.data.myMessages); // 消息列表。
      const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
      const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
      that.setData({
        myMessages: messageList,
        isCompleted: isCompleted,
        nextReqMessageID: nextReqMessageID,
        more_text: isCompleted ? '没有更多了': '下拉查看更多历史信息'
      })
    }).catch(function(imError) {
      console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
    });
  },
  // 设置已读上报
  setMessageRead() {
    var tim = app.globalData.tim
    var that = this
    let promise = tim.setMessageRead({friendID: that.data.friendID})
    promise.then(function(imResponse) {
      // 已读上报成功
      var noready = 0
      that.data.myMessages.forEach(e => {
        if(!e.isRead) {
          noready++
        }
      })
      var number = wx.getStorageSync('number_msg')
      var newNumber = number - noready
      wx.setStorageSync('number_msg', newNumber)
    }).catch(function(imError) {
      // 已读上报失败
      console.warn('setMessageRead error:', imError);
    })
  },

  //获取普通文本消息
  bindKeyInput(e){
    var that = this;
     that.setData({
      inputValue:e.detail.value,
    })
  },
  bindfocus(){
    var that = this;
     that.setData({
      inputShow:false,
      focus:true,
      adjust: true
    })
  },
  bindblur(){
    var that = this;
    if(that.data.inputValue){
      that.setData({
        inputShow:false,
        focus:false
      })
    }else{
      that.setData({
        inputShow:true,
        focus:false
      })
    }
    // 键盘消失
    wx.hideKeyboard()
    // this.setData({
    //   adjust: false
    // })
  },
  // 发送普通文本消息
  bindConfirm(e) {
    var that = this;
    if(that.data.is_lock){
      that.setData({
        is_lock:false
      })
      if (that.data.inputValue.length == 0) {
        wx.showToast({
          title: '消息不能为空!',
          icon:'none'
        })
        that.setData({
          is_lock: true
        })
        return;
      }
      var content = {
        text: that.data.inputValue
      };
      var tim = app.globalData.tim
      var options = {
        to: that.data.friendID.slice(3), // 消息的接收方
        conversationType: TIM.TYPES.CONV_C2C, // 会话类型取值TIM.TYPES.CONV_C2C或TIM.TYPES.CONV_GROUP
        payload: content // 消息内容的容器
      }
      // // 发送文本消息，Web 端与小程序端相同
      // 1. 创建消息实例，接口返回的实例可以上屏
      let message = tim.createTextMessage(options)
      // 2. 发送消息
      let promise = tim.sendMessage(message)
      promise.then(function(imResponse) {
        // 发送成功
        var messageList = that.data.myMessages
        messageList.push(imResponse.data.message)
        that.setData({
          is_lock:true,
          myMessages: messageList
        })
        that.pageScrollToBottom()
        that.clearInput()
      }).catch(function(imError) {
        // 发送失败
        console.warn('sendMessage error:', imError);
      })
    }
  },
  // 清除输入框
  clearInput(e){
    this.setData({
      inputValue:''
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.isDetail = true
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 键盘消失
    wx.hideKeyboard()
    // this.setData({
    //   adjust: false
    // })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  	// 关闭聊天界面的时候需要把当前聊天界面的监听器关闭 否则会一直监听着 在其他页面出现调用多次的问题
    wx.event.off("testFunc")
    // 键盘消失
    wx.hideKeyboard()
    // this.setData({
    //   adjust: false
    // })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    if(!that.data.isCompleted) {
      wx.showLoading({
        title: '加载历史记录中...',
        icon: 'none'
      })
      that.getMoreMsgList()
    } else {
      wx.showToast({
        title: '没有更多历史记录了',
        icon:'none'
      })
    }
    setTimeout(() => {
      wx.stopPullDownRefresh(true)
    }, 300);
  },
  pageScrollToBottom() {
    wx.createSelectorQuery().select('#chat').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      wx.pageScrollTo({
        selector: '#chat',
        scrollTop: rect ? rect.height : 0,
        duration: 0
      })
    }).exec()
  }
})
