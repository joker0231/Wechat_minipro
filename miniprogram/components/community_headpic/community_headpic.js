const userStore = require('../../stores/user-store')
Component({
    properties: {
        name: String,
        headpic: String,
        userid: String //聊天的人的id
    },
    data: {},
    methods: {
        clickToChat: function(event) {
            // wx.navigateTo({
            //   url: '/pages/community/chat/index',
            // })
      
            let id = this.properties.userid
      
            const payloadData = {
              conversationID: `C2C${id}`,
            };
      
            console.log('目标地址', '/TUI-CustomerService/pages/TUI-Chat/chat?conversationInfomation=' + JSON.stringify(payloadData))
            wx.navigateTo({
              url: '/TUI-CustomerService/pages/TUI-Chat/chat?conversationInfomation=' + JSON.stringify(payloadData),
            })
          },

        addfriend: function () {
            console.log('添加好友')
            const userId = userStore.getUserData()._id
            const name = this.properties.name
            // 添加好友
            wx.showModal({
                title: '提交好友申请',
                content: '确定添加该用户为好友吗？',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        let promise = wx.$TUIKit.addFriend({
                            to: userId,
                            source: 'AddSource_Type_WX',
                            remark: name,
                        });
                        promise.then(function (imResponse) {
                            // 添加好友的请求发送成功
                            const { code } = imResponse.data;
                            if (code === 30539) {
                                // 30539 说明 user1 设置了【需要经过自己确认对方才能添加自己为好友】，此时 SDK 会触发 TIM.EVENT.FRIEND_APPLICATION_LIST_UPDATED 事件
                            } else if (code === 0) {
                                // 0 说明 user1 设置了【允许任何人添加自己为好友】，此时 SDK 会触发 TIM.EVENT.FRIEND_LIST_UPDATED 事件
                            }
                            wx.showToast({
                              title: '申请成功',
                              icon: success
                            })
                        }).catch(function (imError) {
                            console.warn('addFriend error:', imError); // 添加好友失败的相关信息
                        });
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })

        }
    }
});
