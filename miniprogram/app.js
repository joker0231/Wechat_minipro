// app.js
// import TIM from 'tim-wx-sdk'
import TIM from './static/tim-wx-friendship'
// import COS from "cos-wx-sdk-v5"         // 用来对象存储
import TIMUploadPlugin from './static/tim-upload-plugin'
import { SDKAPPID } from './debug/GenerateTestUserSig'

const userStore = require('./stores/user-store')
App({
  globalData: {
    tabBar: {
      "color": "#666666",
      "selectedColor": "#7B4D12",
      "backgroundColor": "black",
      "list": [
        {
          "pagePath": "/pages/class/index/index",
          "text": "课程",
          "iconPath": "../../../images/tab1.png",
          "selectedIconPath": "../../../images/tab1.png",
          "clas": "menu-item",
          "selectedColor": "#7B4D12",
          active: true
        },
        {
          "pagePath": "/pages/exercise/index/index",
          "text": "题库",
          "iconPath": "../../../images/tab2.png",
          "selectedIconPath": "../../../images/tab2.png",
          "clas": "menu-item",
          "selectedColor": "#7B4D12",
          active: false
        },
        {
          "pagePath": "/pages/community/index/index",
          "text": "社区",
          "iconPath": "../../../images/tab3.png",
          "selectedIconPath": "../../../images/tab3.png",
          "clas": "menu-item",
          "selectedColor": "#7B4D12",
          active: false
        },
        {
          "pagePath": "/pages/mine/index/index",
          "text": "我的",
          "iconPath": "../../../images/tab4.png",
          "selectedIconPath": "../../../images/tab4.png",
          "clas": "menu-item",
          "selectedColor": "#7B4D12",
          active: false
        }
      ],
      "position": "bottom"
    },
    tabBar1: {
      "color": "#666666",
      "selectedColor": "#7B4D12",
      "backgroundColor": "black",
      "list": [
        {
          "pagePath": "/pages/class/index/index",
          "text": "课程",
          "iconPath": "../../../images/tab1.png",
          "selectedIconPath": "../../../images/tab1.png",
          "clas": "menu-item1",
          "selectedColor": "#7B4D12",
          active: true
        },
        {
          "pagePath": "/pages/community/index/index",
          "text": "社区",
          "iconPath": "../../../images/tab3.png",
          "selectedIconPath": "../../../images/tab3.png",
          "clas": "menu-item1",
          "selectedColor": "#7B4D12",
          active: false
        },
        {
          "pagePath": "/pages/mine/index/index",
          "text": "我的",
          "iconPath": "../../../images/tab4.png",
          "selectedIconPath": "../../../images/tab4.png",
          "clas": "menu-item1",
          "selectedColor": "#7B4D12",
          active: false
        }
      ],
      "position": "bottom"
    },
    tim: '',
    isImLogin: false,
    msgList: [],
    myMessages: new Map(),
    tabBottom: 0, // 全面屏底部黑条高度
    accountTid: '', //当前用户的tid
    isDetail: true,
    userID: null,
    userSig: null,
    SDKAppID: SDKAPPID,
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }
    this.iminit()
  },

  editTabBar: function () {
    //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。
 
    var curPageArr = getCurrentPages();    //获取加载的页面
    var curPage = curPageArr[curPageArr.length - 1];    //获取当前页面的对象
    var pagePath = curPage.route;    //当前页面url
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    
    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;    //根据页面地址设置当前页面状态    
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },
  //第二种底部，原理同上
  editTabBar1: function () {
    var curPageArr = getCurrentPages();
    var curPage = curPageArr[curPageArr.length - 1];
    var pagePath = curPage.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.globalData.tabBar1;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },

  iminit() {
    // let options = {
    //   SDKAppID: 1400686860 // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
    // }
    // var that = this
    // // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
    // let tim = TIM.create(options);// SDK 实例通常用 tim 表示
    // // 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
    // // tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
    // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
    // // 注册 COS SDK 插件
    // tim.registerPlugin({'cos-wx-sdk': COS})
    // // 监听事件，例如：
    // tim.on(TIM.EVENT.SDK_READY, function(event) {
    //   console.log('ready')
    //   that.globalData.isImLogin = true
    //   wx.setStorageSync('isImLogin', true)
    // });

    

    // tim.on(TIM.EVENT.MESSAGE_RECEIVED, function(event) {
    //   console.log('收到消息')// 若同时收到多个消息 根据conversationID来判断是哪个人的消息
    //   var msgarr = []
    //   var newMsgId = event.data[0].conversationID // 定义会话键值
    //   console.log(msgarr[newMsgId])
    //   if(msgarr[newMsgId]) {
    //     msgarr[newMsgId].push(event.data[0])
    //   } else {
    //     msgarr[newMsgId] = [event.data[0]]
    //   }
    //   that.globalData.myMessages = msgarr
    //   // 这里引入了一个监听器 （因为小程序没有类似vuex的状态管理器 当global里面的数据变化时不能及时同步到聊天页面 因此 这个监听器可以emit一个方法 到需要更新会话数据的页面 在那里进行赋值）
    //   wx.event.emit('testFunc',that.globalData.myMessages,newMsgId) // 详情页的函数
    //   wx.event.emit('conversation') // 会话列表的监听函数
    //   // 未读消息数
    //   var number = wx.getStorageSync('number_msg') || 0
    //   // 根据isRead判断是否未读 否则加1
    //   if(!event.data[0].isRead) {
    //     number = number++
    //   }
    //   console.log(number)
    //   wx.setStorageSync('number_msg', number)
    //   // 如果有未读数 需要设置tabbar的红点标志 反之去掉红点标志
    //   if(number>0) {
    //     wx.setTabBarBadge({
    //       index: 3,
    //       text: number.toString()
    //     })
    //   } else {
    //     wx.hideTabBarRedDot({
    //       index: 3
    //     })
    //   }
    //   // SDK 收到对端已读消息的通知，即已读回执。使用前需要将 SDK 版本升级至 v2.7.0 或以上。仅支持单聊会话。
    //   // event.name - TIM.EVENT.MESSAGE_READ_BY_PEER
    //   // event.data - event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isPeerRead 属性值为 true
    // })
  
    // tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function(event) {
    //   // 更新当前所有会话列表
    //   // 注意 这个函数在首次点击进入会话列表的时候也会执行 因此点击消息 可以显示当前的未读消息数（unreadCount表示未读数）
    //   console.log('发送了消息')
    //   console.log('更新当前所有会话列表')
    //   var conversationList = event.data
    //   var number =  0
    //   conversationList.forEach(e => {
    //     number = number + e.unreadCount
    //   })
    //   wx.setStorageSync('number_msg', number)
    //   if(number>0) {
    //     wx.setTabBarBadge({
    //       index: 3,
    //       text: number.toString()
    //     })
    //   } else {
    //     wx.hideTabBarRedDot({
    //       index: 3
    //     })
    //   }
    //   // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
    //   // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
    //   // event.data - 存储 Conversation 对象的数组 - [Conversation]
    // });
  
    // tim.on(TIM.EVENT.SDK_NOT_READY, function(event) {
    //   // wx.setStorageSync('isImLogin', false)
    //   console.log('SDK_NOT_READY')
    //   that.globalData.isImLogin = false
    //   wx.setStorageSync('isImLogin', false)
    //   // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
    //   // event.name - TIM.EVENT.SDK_NOT_READY
    // });
  
    // tim.on(TIM.EVENT.KICKED_OUT, function(event) {
    //   console.log('KICKED_OUT')
    //   wx.setStorageSync('isImLogin', false)
    //   that.globalData.isImLogin = false
    //   // 收到被踢下线通知
    //   // event.name - TIM.EVENT.KICKED_OUT
    //   // event.data.type - 被踢下线的原因，例如:
    //   //    - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
    //   //    - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
    //   //    - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢
    // })
    // that.globalData.tim = tim



    wx.setStorageSync('islogin', false)
    const SDKAppID = this.globalData.SDKAppID
    wx.setStorageSync(`TIM_${SDKAppID}_isTUIKit`, true)
    wx.$TUIKit = TIM.create({ SDKAppID: this.globalData.SDKAppID })
    wx.$TUIKit.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin })
    wx.$TUIKitTIM = TIM
    wx.$TUIKitEvent = TIM.EVENT
    wx.$TUIKitVersion = TIM.VERSION
    wx.$TUIKitTypes = TIM.TYPES
    // 监听系统级事件
    wx.$TUIKit.on(wx.$TUIKitEvent.SDK_NOT_READY, this.onSdkNotReady)
    wx.$TUIKit.on(wx.$TUIKitEvent.KICKED_OUT, this.onKickedOut)
    wx.$TUIKit.on(wx.$TUIKitEvent.ERROR, this.onTIMError)
    wx.$TUIKit.on(wx.$TUIKitEvent.NET_STATE_CHANGE, this.onNetStateChange)
    wx.$TUIKit.on(wx.$TUIKitEvent.SDK_RELOAD, this.onSDKReload)
    wx.$TUIKit.on(wx.$TUIKitEvent.SDK_READY, this.onSDKReady)
  },
  onSDKReady() {
    const userData = userStore.getUserData()
    const kindMap = new Map([['student', '学生'], ['teacher', '教师']])
    wx.$TUIKit.updateMyProfile({
      nick: userData.nickname + '（' + kindMap.get(userData.kind) + '）',
      avatar: userData.avatar
    }).then(resp=>{
      console.log('资料更新成功', resp)
    })
  },
  onSdkNotReady() {

  },

  onKickedOut() {
    wx.showToast({
      title: '您被踢下线',
      icon: 'error',
    })
    wx.navigateTo({
      url: './pages/TUI-Login/login',
    })
  },

  onTIMError() {
  },

  onNetStateChange() {

  },

  onSDKReload() {

  },
});
