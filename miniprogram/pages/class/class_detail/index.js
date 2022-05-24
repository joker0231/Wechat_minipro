// pages/class/class_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenHeight: 1,
    dynamicStyle: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '动态课程名称',
    })

    let screenHeight = wx.getSystemInfoSync().windowHeight
    let screenWidth = wx.getSystemInfoSync().windowWidth
    let ratio = 750 / screenWidth;
    let rpxScreenHeight = screenHeight * ratio



    wx.createSelectorQuery().select('#outer').boundingClientRect(rect=>{
      // console.log(screenHight, 'screenHeight')
      // console.log(rect.height,'textHeight');

      let rpxRestHeight = rpxScreenHeight - rect.height * ratio;
      // console.log(restHeight, 'restHeight')

      // 获取不到底层 tabs的高度 因此采用rpx 写死固定我们css里的高度 别的情况能确定获取的用来来获取
      // this.createSelectorQuery().select('van-sticky').boundingClientRect(rect=>{
      //   let scrollHeight = rpxRestHeight - rect.height
      //   console.log(scrollHeight)

      //   let DynamicStyle = `
      //   --downHeight: ${scrollHeight*2}rpx
      //   `
      //   this.setData({
      //     dynamicStyle: DynamicStyle
      //   })
      // }).exec()      


      // 112源头
  //      .my-style .van-tabs__wrap {
  // --tabs-line-height: 112rpx;

      let DynamicStyle = `
        --downHeight: ${rpxRestHeight - 112}rpx
        `
      this.setData({
        dynamicStyle: DynamicStyle
      })
    }).exec();

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