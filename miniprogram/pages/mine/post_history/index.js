import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'

Page({
    data: {
        userTopic: []
    },
    onLoad: function (options) {
        wx.cloud.callFunction({
            name: 'personFunctions',
            config: {
              env: 'lemon-7glhwqyu5304e1f9'
            },
            data: {
              type: "getUserTopic",
              userId: "636050766258dad005cb320f0d7bc76c"
            }
          }).then((resp) => {
            console.log(resp, 'getUserTopic')
            this.setData({
              userTopic: resp.result
            }, ()=>{
              console.log(this.data.userTopic)
            })
            // console.log(JSON.stringify(resp.result.data[0]), '123')
          }).catch((e) => {
            console.log(e);
          });
    },

    clickDelete: function (event) {
      console.log(event.currentTarget.dataset.topicid)
      Dialog.confirm({
        title: '提示',
        message: '确认删除？',
      })
        .then(() => {
          wx.cloud.callFunction({
            name: 'communityFunctions',
            config: {
              env: 'lemon-7glhwqyu5304e1f9'
            },
            data: {
              type: "deletePost",
              postId: event.currentTarget.dataset.topicid
            }
          }).then((resp) => {
            console.log(resp)
            // 提示删除
            if(resp.result.stats.removed === 1) {
              Toast('删除成功');
              wx.cloud.callFunction({
                name: 'personFunctions',
                config: {
                  env: 'lemon-7glhwqyu5304e1f9'
                },
                data: {
                  type: "getUserTopic",
                  userId: "636050766258dad005cb320f0d7bc76c"
                }
              }).then((resp) => {
                console.log(resp, 'getUserTopic')
                this.setData({
                  userTopic: resp.result
                }, ()=>{
                  console.log(this.data.userTopic)
                })
                // console.log(JSON.stringify(resp.result.data[0]), '123')
              }).catch((e) => {
                console.log(e);
              });
            } else {
              Toast('删除失败');
            }
          }).catch((e) => {
            console.log(e);
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    clickToDetail(event) {
      console.log(event, '前面的')
      // console.log(event.currentTarget.dataset,'123')
      wx.navigateTo({
        url: '/pages/community/post_detail/index?topicId=' + event.currentTarget.dataset.topicid,
      })
    },
});