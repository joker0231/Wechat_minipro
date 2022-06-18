import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
const userStore = require('../../../stores/user-store')

Page({
    data: {
        userTopic: [],
        empty_show: false,
    },
    onLoad: function (options) {
        wx.cloud.callFunction({
            name: 'personFunctions',
            config: {
              env: 'lemon-7glhwqyu5304e1f9'
            },
            data: {
              type: "getUserTopic",
              userId: userStore.getUserData()._id
            }
          }).then((resp) => {
            console.log(resp, 'getUserTopic')
            if(resp.result) {
              this.setData({
                userTopic: resp.result
              }, ()=>{
                console.log(this.data.userTopic)
              })
            } else {
              // 再调用自己 真的垃圾 有时候返回为null
              this.setData({
                empty_show: true,
              })
            }
            
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
                  userId: userStore.getUserData()._id
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