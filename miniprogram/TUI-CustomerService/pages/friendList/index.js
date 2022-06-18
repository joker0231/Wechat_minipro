import logger from '../../../utils/logger';

// eslint-disable-next-line no-undef
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendList: [],
    index: Number,
    conversationInfomation: {},
    empty_showclassmate: false,
    empty_showteacher: false,
    transChenckID: '',
    navState: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 登入后拉去会话列表
    wx.$TUIKit.on(wx.$TUIKitEvent.FRIEND_LIST_UPDATED, this.onFriendListUpdated, this);
    this.getFriendList();
    console.log(this.data.friendList)
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    wx.$TUIKit.off(wx.$TUIKitEvent.FRIEND_LIST_UPDATED, this.onFriendListUpdated);
  },

  navSwitch: function(e) {
    // console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    this.setData({
        navState:index
    })
},
  // 跳转到子组件需要的参数
  handleRoute(event) {
    const flagIndex = this.data.friendList.findIndex(item => item.conversationID === event.currentTarget.id);
    this.setData({
      index: flagIndex,
    });
    this.getFriendList();
    this.data.conversationInfomation = { conversationID: event.currentTarget.id};
    const url = `../../TUI-Chat/chat?conversationInfomation=${JSON.stringify(this.data.conversationInfomation)}`;
    wx.navigateTo({
      url,
    });
  },
  // 更新好友列表
  onFriendListUpdated(event) {
    logger.log('| TUI-FriendList | onFriendListUpdated | ok');
    this.setData({
      friendList: event.data,
    });
  },
  // 获取好友列表
  getFriendList() {
    wx.$TUIKit.getFriendList().then((imResponse) => {
      console.log(imResponse)
      this.setData({
        friendList: imResponse.data,
      });
      if(this.data.friendList.length == 0){
        this.setData({
          empty_showclassmate: true
        })
      }
    });
  },
  // 展示发起会话/发起群聊/加入群聊
  showSelectedTag() {
    this.setData({
      showSelectTag: !this.data.showSelectTag,
    });
  },
  // 跳转事件路径
  $createConversation() {
    wx.navigateTo({
      url: '../create-conversation/create',
    });
  },

  transCheckID(event) {
    this.setData({
      transChenckID: event.detail.checkID,
    });
  },
});
