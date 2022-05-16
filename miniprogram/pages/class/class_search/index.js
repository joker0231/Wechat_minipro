// pages/class/class_search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    tags: ['数学', '第一小节', '标12312签3', '标签4', '标签5', '标签6', '标签7', '标签8', '标签9', ]
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {

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

  onChange(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
  },


  onConfirm(event) {
    console.log(event.detail)
    wx.navigateTo({
      url: '/pages/class/class_search/search_result/index',
    })
  },

  onClose(event) {
    event.stopP
    let preData = this.data.tags
    preData.splice(event.target.id, 1)
    this.setData({
      tags: preData
    })
  },

  onConfirmTag(event) {
    console.log(event.target.id)
    wx.navigateTo({
      url: '/pages/class/class_search/search_result/index',
    })
  },

  temp(){
    console.log('123')
  }
})