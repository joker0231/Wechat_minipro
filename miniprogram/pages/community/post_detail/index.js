// pages/community/postDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    htmlsnip: 
      `<div class="div_class">
        <h1>Title</h1>
        <p class="p">
          这里要考虑发帖里有图片的格式，估计也要富文本
        </p>
      </div>`
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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