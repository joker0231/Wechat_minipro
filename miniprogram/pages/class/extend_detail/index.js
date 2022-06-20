// pages/class/extend_detail/index.js
import fetchYun from '../../../utils/fetchYun'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expandClass: {},
    htmlsnip: ``
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.classId;

    fetchYun('classFunctions', {
      type: 'getExpandClassById',
      classId: id
    }).then(resp=>{
      console.log(resp, 'expand数据')
      this.setData({
        expandClass: resp.result.data[0],
        htmlsnip: resp.result.data[0].detail
      })
    })



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