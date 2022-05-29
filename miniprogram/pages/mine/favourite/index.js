const userStore = require('../../../stores/user-store')
Page({
    data: {
      collectClass: []
    },
    onLoad: function (options) {
      wx.cloud.callFunction({
        name: 'personFunctions',
        config: {
          env: 'lemon-7glhwqyu5304e1f9'
        },
        data: {
          type: "getUserCollectByType",
          collectType: 'class',
          userId: userStore.getUserData()._id
        }
      }).then((resp) => {
        console.log(resp)
        this.setData({
          collectClass: resp.result.data
        })
      }).catch((e) => {
        console.log(e);
      });
    }
});