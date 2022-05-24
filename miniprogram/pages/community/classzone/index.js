Page({
    data: {
        classCard: []
    },
    onLoad: function (options) {
        wx.cloud.callFunction({
            name: 'communityFunctions',
            config: {
              env: 'lemon-7glhwqyu5304e1f9'
            },
            data: {
              type: "getClassCard"
            }
          }).then((resp) => {
            console.log(resp, 'getCommonCard')
            this.setData({
              classCard: resp.result
            }, ()=>{
              console.log(this.data.classCard)
            })
            // console.log(JSON.stringify(resp.result.data[0]), '123')
          }).catch((e) => {
            console.log(e);
          });
    },
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