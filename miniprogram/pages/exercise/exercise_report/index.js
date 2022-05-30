// pages/exercise/quiz_report/index.js
const exerciseStore = require('../../../stores/exercise-store')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exercise: [],
    user_input: [],
    wrong_exercise: [],
    correct: 0,
    section: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const exerciseList = exerciseStore.getExerciseListData()
    const userAnswer = exerciseStore.getUserAnswerData()
    const wrong_exercise = exerciseStore.getWrongExerciseListData()
    const correct = exerciseStore.getCorrectData()
    const section = exerciseStore.getSectionData()
    this.setData({
      exercise: exerciseList,
      user_input: userAnswer,
      wrong_exercise:wrong_exercise,
      correct: correct,
      section: section
    })
    console.log(section)
    wx.setNavigationBarTitle({
      title: '动态学科章节',
    })
  },

  clickQuit: function() {
    wx.switchTab({
      url: '/pages/exercise/index/index',
    })
  },

  onClickToDetail: function() {
    wx.navigateTo({
      url: '/pages/exercise/exercise_report/report_detail/index',
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

  }
})