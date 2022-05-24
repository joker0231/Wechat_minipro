// pages/register/community_headpic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     register_student:"register_show",
     register_teacher:"register_hide"
  },

  changetostudent: function (){
      this.setData({
        register_student:"register_show",
        register_teacher:"register_hide"})
  },

  changetoteacher: function (){
      this.setData({
        register_student:"register_hide",
        register_teacher:"register_show"})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})