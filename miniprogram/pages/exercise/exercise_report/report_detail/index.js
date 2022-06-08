// pages/exercise/online_quiz/index.js
const exerciseStore = require('../../../../stores/exercise-store')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exercise: [],
    user_input: [],
    current: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const exerciseList = exerciseStore.getExerciseListData()
    const userAnswer = exerciseStore.getUserAnswerData()
    this.setData({
      exercise: exerciseList,
      user_input: userAnswer
    })
    wx.setNavigationBarTitle({
      title: "语文·上册·人教版"
    })
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
    this.setData({
      current: event.detail.current
    })
  },

  onClickPrev() {
    let prevIndex = this.data.current
    this.setData({
      current: prevIndex - 1
    })
  },

  onClickNext() {
    let prevIndex = this.data.current
    this.setData({
      current: prevIndex+1
    })
  },

  clickToReport() {
    wx.showModal({
      title: '提交报告',
      content: '确定提交做题查看报告？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: '/pages/exercise/exercise_report/index',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  onClickPopDot(event) {
    this.setData({
      current: event.currentTarget.dataset.inputindex,
      show: false
    })
  },

})