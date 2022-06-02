// pages/community/postDetail/index.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
const userStore = require('../../../stores/user-store')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    htmlsnip: 
      `<div class="div_class">
        <h1>Title</h1>
        <p class="p">
          这里要考虑发帖里有图片的格式，估计也要富文本123
        </p>
      </div>`,
    detail: {},
    show: false,
    commentValue: '',
    commentValueSub: '',
    postId: '',
    showSub: false,
    curretnMainCommentId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.topicId, 123123123123123123123)
    

    let screenHeight = wx.getSystemInfoSync().windowHeight
    let screenWidth = wx.getSystemInfoSync().windowWidth
    let ratio = 750 / screenWidth;
    let rpxScreenHeight = screenHeight * ratio
    
    wx.createSelectorQuery().select('.up-view').boundingClientRect(rect=>{
      let rpxDownHeight = rpxScreenHeight - rect.height * ratio;

      let DynamicStyle = `
        --downHeight: ${rpxDownHeight - 20}rpx
        `
      this.setData({
        dynamicStyle: DynamicStyle
      })
    }).exec()



    // 上面是动态高度
    // 下面是数据
    console.log(123123123123123123123)
    wx.cloud.callFunction({
      name: 'communityFunctions',
      config: {
        env: 'lemon-7glhwqyu5304e1f9'
      },
      data: {
        type: "getTopicDetail",
        postId: options.topicId
      }
    }).then((resp) => {
      this.setData({
        detail: resp.result,
        topicId: options.topicId    
      },()=>{
        console.log(this.data.detail)
      })
      // console.log(JSON.stringify(resp.result.data[0]), '123')
    }).catch((e) => {
      console.log(e);
    });

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onClose() {
    this.setData({ show: false });
  },

  onCloseSub() {
    this.setData({ showSub: false });
  },

  inputComment() {
    this.setData({ show: true })
  },

  sendReplyInfo(target_topic_id, target_user_id, comment_user_id, content) {
    var date = new Date();
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds(); 
    const template = {
      target_topic_id: target_topic_id,
      target_user_id: target_user_id,
      comment_user_id: comment_user_id,
      content: content,
      date: Y+M+D,
      isChecked: false
    }

    wx.cloud.callFunction({
      name: 'communityFunctions',
      config: {
        env: 'lemon-7glhwqyu5304e1f9'
      },
      data: {
        type: "createTopicReply",
        body: template
      }
    }).then((resp) => {
      console.log(resp)
    }).catch(err=>{
      console.error(err)
    })
  },

  submitCommentSub() {
    console.log(this.data.commentValueSub)
    var date = new Date();
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds(); 
    console.log(Y+M+D+h+m+s); //呀麻碟

    let temp = {
      "community_comment_main_id": this.data.curretnMainCommentId,
      "content": this.data.commentValueSub,
      "date": Y+M+D,
      "user_id": userStore.getUserData()._id
    }

    wx.cloud.callFunction({
      name: 'communityFunctions',
      config: {
        env: 'lemon-7glhwqyu5304e1f9'
      },
      data: {
        type: "createViceComment",
        body: temp
      }
    }).then((resp) => {
      console.log(resp, 'createViceComment')
      // console.log(JSON.stringify(resp.result.data[0]), '123')
      Toast({
        duration: 1000,
        message: '发布成功'
      })
      wx.cloud.callFunction({
        name: 'communityFunctions',
        config: {
          env: 'lemon-7glhwqyu5304e1f9'
        },
        data: {
          type: "getTopicDetail",
          postId: this.data.topicId
        }
      }).then((resp) => {
        this.setData({
          detail: resp.result,
          showSub: false,
          commentValueSub: ''
        },()=>{
          console.log(this.data.detail)
        })
        // console.log(JSON.stringify(resp.result.data[0]), '123')
      }).catch((e) => {
        console.log(e);
      });
    }).catch((e) => {
      console.log(e);
    });
  },

  submitComment() {
    console.log(this.data.commentValue)

    var date = new Date();
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds(); 
    console.log(Y+M+D+h+m+s); //呀麻碟

    let template = {
      "community_topic_id": this.data.topicId,
      "content": this.data.commentValue,
      "date": Y+M+D,
      "like_num": 0,
      "user_id": userStore.getUserData()._id,
      "vice_comment_num": 0
    }

    wx.cloud.callFunction({
      name: 'communityFunctions',
      config: {
        env: 'lemon-7glhwqyu5304e1f9'
      },
      data: {
        type: "createMainComment",
        body: template
      }
    }).then((resp) => {
      console.log(resp, 'createMainComment')

      // 发布回复评论消息
      const {detail} = this.data
      this.sendReplyInfo(detail._id, detail.user._id, userStore.getUserData()._id, this.data.commentValue)

      Toast({
        duration: 1000,
        message: '发布成功'
      })
      wx.cloud.callFunction({
        name: 'communityFunctions',
        config: {
          env: 'lemon-7glhwqyu5304e1f9'
        },
        data: {
          type: "getTopicDetail",
          postId: this.data.topicId
        }
      }).then((resp) => {
        this.setData({
          detail: resp.result,
          show: false,
          commentValue: ''
        },()=>{
          console.log(this.data.detail)
        })
        // console.log(JSON.stringify(resp.result.data[0]), '123')
      }).catch((e) => {
        console.log(e);
      });
    }).catch((e) => {
      console.log(e);
    });
  },

  subcomment: function(event) {
    console.log('这是外面', event.currentTarget.dataset.commentid)
    this.setData({
      curretnMainCommentId: event.currentTarget.dataset.commentid,
      showSub: true
    })
  }
})