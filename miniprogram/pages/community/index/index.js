Page({
    data: {
      commonCard: [],
      teacher: []
    },
    onReady: function() {

    },
    onShow: function (options) {
      console.log('123')
      wx.cloud.callFunction({
        name: 'communityFunctions',
        config: {
          env: 'lemon-7glhwqyu5304e1f9'
        },
        data: {
          type: "getCommonCard"
        }
      }).then((resp) => {
        // console.log(resp, 'getCommonCard')
        this.setData({
          commonCard: resp.result
        }, ()=>{
          console.log(this.data.commonCard)
        })
        // console.log(JSON.stringify(resp.result.data[0]), '123')
      }).catch((e) => {
        console.log(e);
      });

      wx.cloud.callFunction({
        name: 'userFunctions',
        config: {
          env: 'lemon-7glhwqyu5304e1f9'
        },
        data: {
          type: "readUserByKind",
          kind: 'teacher'
        }
      }).then((resp) => {
        console.log(resp, 'getCommonCard')
        this.setData({
          teacher: resp.result.data
        })
        // console.log(JSON.stringify(resp.result.data[0]), '123')
      }).catch((e) => {
        console.log(e);
      });
    },

    clickToZone: function() {
        console.log(123)
        wx.navigateTo({
          url: '/pages/community/classzone/index',
        })
    },
    clickToChat: function() {
      wx.navigateTo({
        url: '/pages/community/chat/index',
      })
    },

    clickToNewPost: function() {
      wx.navigateTo({
        url: '/pages/community/post_new/index',
      })
    },

    // clickToDetail: function() {
    //   wx.navigateTo({
    //     url: '/pages/community/post_detail/index？',
    //   })
    // }

    clickToDetail(event) {
      this.setData({
        current: event.currentTarget.dataset.inputindex,
        show: false
      })
      // console.log(event.currentTarget.dataset,'123')
      wx.navigateTo({
        url: '/pages/community/post_detail/index?topicId=' + event.currentTarget.dataset.topicid,
      })
    },

   
});