const app = getApp()
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

        const copy = [...resp.result.data]
        const teacherIdArray = copy.map(e => e.account)     // 这个查询IM的数组 但是其实手机号就是ID，可以暂时先全部用手机号传递聊天 因为每个角色注册后登录是可以获取的 有个问题 万一注册了不登录怎么办？
        wx.$TUIKit.getUserProfile({     // 测试查询一下
          userIDList: teacherIdArray
        }).then((imRes) => {
          console.log(imRes, '123123123123123123')
          this.setData({
            teacher: imRes.data
          })
        })

        

        // 这里改一下用IM的
        // this.setData({
        //   teacher: resp.result.data
        // })
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
    clickToChat: function(event) {
      // wx.navigateTo({
      //   url: '/pages/community/chat/index',
      // })

      let id = event.currentTarget.dataset.userid

      const payloadData = {
        conversationID: `C2C${id}`,
      };

      console.log('目标地址', '/TUI-CustomerService/pages/TUI-Chat/chat?conversationInfomation=' + JSON.stringify(payloadData))
      wx.navigateTo({
        url: '/TUI-CustomerService/pages/TUI-Chat/chat?conversationInfomation=' + JSON.stringify(payloadData),
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