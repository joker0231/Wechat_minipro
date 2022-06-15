// pages/mine/record/index.js
const userStore = require('../../../stores/user-store')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordClass: [],
      recordExercise: [],
      recordPost: [],
      empty_showclass: false,
      empty_showpost: false,
      empty_showexericise: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'personFunctions',
      config: {
        env: 'lemon-7glhwqyu5304e1f9'
      },
      data: {
        type: "getUserRecordByType",
        recordType: 'class',
        userId: userStore.getUserData()._id
      }
    }).then((resp) => {
      console.log(resp)
      if(resp.result.data.length){
      this.setData({
        recordClass: resp.result.data
      })
      }else{
        this.setData({
          empty_showclass: true,
        })
      }
    }).catch((e) => {
      console.log(e);
    });

    wx.cloud.callFunction({
      name: 'personFunctions',
      config: {
        env: 'lemon-7glhwqyu5304e1f9'
      },
      data: {
        type: "getUserRecordByType",
        recordType: 'exercise',
        userId: userStore.getUserData()._id
      }
    }).then((resp) => {
      console.log(resp)
      if(resp.result.data.length){
        this.setData({
          recordExercise: resp.result.data
        })
        }else{
          this.setData({
            empty_showexericise: true,
          })
        }
    }).catch((e) => {
      console.log(e);
    });

    wx.cloud.callFunction({
      name: 'personFunctions',
      config: {
        env: 'lemon-7glhwqyu5304e1f9'
      },
      data: {
        type: "getUserRecordByType",
        recordType: 'topic',
        userId: userStore.getUserData()._id
      }
    }).then((resp) => {
      console.log(resp)
      if(resp.result.data.length){
        this.setData({
          recordPost: resp.result.data
        })
        }else{
          this.setData({
            empty_showpost: true,
          })
        }
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

  }
})