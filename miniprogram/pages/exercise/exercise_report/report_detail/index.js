// pages/exercise/online_quiz/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exercise: [
      {title: '1. 在7348 、7438 、7384 、7834中，最小的数是（    ）。 在7348 、7438 、7384 、7834中，最小的数是（    ）。', type: 'choice', choices: ['A. 啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦1111111111', 'B. 啦啦啦啦啦啦啦啦啦啦啦啦啦啦11111111111111111', 'C. 啦啦啦啦啦啦啦啦啦啦啦啦啦啦11111111113123123', 'D. 7348']}, 
      {title: '2. 周末，信息技术老师布置同学们完成的作业是打印一段560字的文章。周六，王毅先打了210字，然后休息了一段时间。休息后，他打算再打一些，争取完成文章的4/7，，余下的周日再完成。这样，王毅周六还要再打多少字？', type: 'text'}, 
      {title: '3. 测试3', type: 'choice', choices: ['A. 啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦1111111111', 'B. 啦啦啦啦啦啦啦啦啦啦啦啦啦啦11111111111111111', 'C. 啦啦啦啦啦啦啦啦啦啦啦啦啦啦11111111113123123', 'D. 7348']},
      {title: '4. 周末，信息技术老师布置同学们完成的作业是打印一段560字的文章。周六，王毅先打了210字，然后休息了一段时间。休息后，他打算再打一些，争取完成文章的4/7，，余下的周日再完成。这样，王毅周六还要再打多少字？', type: 'text'}, 
      {title: '5. 周末，信息技术老师布置同学们完成的作业是打印一段560字的文章。周六，王毅先打了210字，然后休息了一段时间。休息后，他打算再打一些，争取完成文章的4/7，，余下的周日再完成。这样，王毅周六还要再打多少字？', type: 'text'}, 
      {title: '6. 周末，信息技术老师布置同学们完成的作业是打印一段560字的文章。周六，王毅先打了210字，然后休息了一段时间。休息后，他打算再打一些，争取完成文章的4/7，，余下的周日再完成。这样，王毅周六还要再打多少字？', type: 'text'}
    ],
    user_input: ["0", "测试测试测试", "2", "", "", ""],
    current: 0,
    answer_array: ['测试答案33333333333333333', '测试123123123答案', '测试33333333332323答案', '测试答案', '测试答案', '测试答案',]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "动态课程标题"
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