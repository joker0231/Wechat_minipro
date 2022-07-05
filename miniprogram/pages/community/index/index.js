const app = getApp()
import fetchYun from '../../../utils/fetchYun'
const userStore = require("../../../stores/user-store")
Page({
  data: {
    commonCard: [],
    teacher: [],
    isteacher: false
  },
  onReady: function () {

  },
  onShow: function (options) {
    console.log('123')

    if(userStore.getUserData().kind == 'student'){
      app.editTabBar();
    }else{
      app.editTabBar1()
      this.setData({
        isteacher: true
      })
    };  
    fetchYun("communityFunctions", { type: "getCommonCard" }).then(resp => {
      console.log(resp,77777)
      this.setData({
        commonCard: resp.result
      })
    })

    fetchYun('userFunctions', {
      type: "readUserByKind",
      kind: 'teacher'
    }).then((resp) => {
      console.log(resp, 'readUserByKind')

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

  clickToZone: function () {
    console.log(123)
    wx.navigateTo({
      url: '/pages/community/classzone/index',
    })
  },
  // clickToChat: function(event) {
  //   // wx.navigateTo({
  //   //   url: '/pages/community/chat/index',
  //   // })

  //   let id = event.currentTarget.dataset.userid

  //   const payloadData = {
  //     conversationID: `C2C${id}`,
  //   };

  //   console.log('目标地址', '/TUI-CustomerService/pages/TUI-Chat/chat?conversationInfomation=' + JSON.stringify(payloadData))
  //   wx.navigateTo({
  //     url: '/TUI-CustomerService/pages/TUI-Chat/chat?conversationInfomation=' + JSON.stringify(payloadData),
  //   })
  // },

  clickToNewPost: function () {
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

    let result = {}
    fetchYun('communityFunctions', {
      type: "getTopicDetail",
      postId: event.currentTarget.dataset.topicid
    }).then((resp) => {
      fetchYun("communityFunctions", {
        type: "createPostRecord",
        post_info: resp.result,
        topic_id: event.currentTarget.dataset.topicid,
        userId: userStore.getUserData()._id
      }).then(resp => {
        console.log(resp, 1111111)
      })
      // console.log(JSON.stringify(resp.result.data[0]), '123')
    }).catch((e) => {
      console.log(e);
    });


    wx.navigateTo({
      url: '/pages/community/post_detail/index?topicId=' + event.currentTarget.dataset.topicid,
    })
  },


});