// pages/class/class_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenHeight: 1,
    dynamicStyle: '',
    _id: '',
    author: '',
    title: '',
    detail: '',
    grade: '',
    introduction: '',
    is_collected: '',
    semester: '',
    subjct: '',
    content: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({
        _id: data.data
      })
      console.log(that.data._id)
    })

    wx.cloud.callFunction({
      name: 'classFunctions',
      config: {
        env: 'lemon-7glhwqyu5304e1f9'
      },
      data: {
        type: "getClassById",
        classId: this.data._id
      }
    }).then((resp) => {
      const result = resp.result.data[0]
      this.setData({
        _id: result._id,
        author: result.author,
        title: result.title,
        detail: result.detail,
        grade: result.grade,
        introduction: result.introduction,
        is_collected: result.is_collected,
        semester: result.semester,
        subjct: result.subjct,
      })
    }).catch((e) => {
      console.log(e);
    });

    wx.cloud.callFunction({
      name: 'classFunctions',
      config: {
        env: 'lemon-7glhwqyu5304e1f9'
      },
      data: {
        type: "getClassVideoById",
        classId: this.data._id
      }
    }).then((resp) => {
      this.setData({
        content: resp.result.data[0].content
      })
    }).catch((e) => {
      console.log(e);
    });

    wx.setNavigationBarTitle({
      title: '动态课程名称',
    })

    let screenHeight = wx.getSystemInfoSync().windowHeight
    let screenWidth = wx.getSystemInfoSync().windowWidth
    let ratio = 750 / screenWidth;
    let rpxScreenHeight = screenHeight * ratio



    wx.createSelectorQuery().select('#outer').boundingClientRect(rect => {
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