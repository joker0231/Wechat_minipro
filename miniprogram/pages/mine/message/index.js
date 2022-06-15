const userStore = require('../../../stores/user-store')

Page({
    data: {
      reply_data: []
    },
    onLoad: function (options) {
      
      wx.cloud.callFunction({
        name: 'communityFunctions',
        config: {
          env: 'lemon-7glhwqyu5304e1f9'
        },
        data: {
          type: "getReplyByUserId",
          userId: userStore.getUserData()._id
        }
      }).then((resp) => {
        console.log(resp, '想要查看的消息')
        this.setData({
          reply_data: resp.result
        },()=>{
          console.log(this.data.reply_data)
        })
      })

    }
});