// pages/exercise/online_quiz/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exercise: [],
    user_input: [],
    current: 0,
    show: false, // 弹出答题卡

  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "动态课程标题"
    })
    wx.enableAlertBeforeUnload({
      message: "您的做题内容未提交报告 ，退出将丢失做题记录！未做完也可右上角直接提交查看结果！",
      success: function (res) {
        console.log("方法注册成功：", res);
      },
      fail: function (errMsg) {
        console.log("方法注册失败：", errMsg);
      },
    });

    wx.cloud.callFunction({
      name: 'exerciseFunctions',
      config: {
        env: 'lemon-7glhwqyu5304e1f9'
      },
      data: {
        type: "getExerciseList",
        grade: "一年级",
        subject: "语文",
        section: "1.1"
      }
    }).then((resp) => {
      this.setData({
        exercise: resp.result.list
      })
      console.log(this.data.exercise)
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
    this.setData({
      user_input: new Array(this.data.exercise.length).fill('')
    }, ()=>{
      console.log(this.data.user_input)
    })
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
          wx.redirectTo({
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

  onClickChoice(event) {
    console.log(event.currentTarget.dataset.choiceindex)
    let prevUserInput = this.data.user_input
    prevUserInput[this.data.current] = event.currentTarget.dataset.choiceindex + ''
    this.setData({
      user_input: prevUserInput
    }, ()=>{
      console.log(this.data.user_input)
    })

    // 检查所有题目是否都做完  是的话关闭enableAlertBeforeUnload 
    // https://www.jianshu.com/p/b2d912920a6a
    // if(this.data.user_input.every(e=> e !== '')) {    // 效率更好的写法？
    //   console.log('所有题目做完')
    //   wx.disableAlertBeforeUnload()
    // }
  },

  onInput(event) {
    // 保险一点onChange 优化可以blur啥的 
    let prevUserInput = this.data.user_input
    prevUserInput[this.data.current] = event.detail + ''
    this.setData({
      user_input: prevUserInput
    }, ()=>{
      console.log(this.data.user_input)
    })


    // 检查所有题目是否都做完  是的话关闭enableAlertBeforeUnload  ❌ 到报告页面返回的时候来disable
    // https://www.jianshu.com/p/b2d912920a6a
    // if(this.data.user_input.every(e=> e !== '')) {    // 效率更好的写法？
    //   console.log('所有题目做完')
    //   wx.disableAlertBeforeUnload()
    // }
  }
  
})