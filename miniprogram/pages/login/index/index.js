const userStore = require('../../../stores/user-store')

// pages/index/community_headpic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    password: '',
    error_message: ''     // 错误信息
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

  },

  getAccount(event) {
    console.log(event)
    this.setData({
     account: event.detail.value
    })
    },
    //获取用户账号
  getPassword(event) {
    this.setData({
     password: event.detail.value
    })
    },

  clickLogin: function() {
    // if(this.data.account.length!=11){
    //   console.log(this.data.account)
    //   wx.showToast({
    //     title: '手机号应为11位',
    //     icon: "none"
    //   })
    //   return
    // }
    wx.cloud.callFunction({
      name: 'userFunctions',
      config: {
        env: 'lemon-7glhwqyu5304e1f9'
      },
      data: {
        type: "loginUser",
        account: this.data.account,
        password: this.data.password
      }
    }).then((resp) => {
      if(resp.result.errMsg=="账号或密码错误！"){
        console.log(resp, 'loginUser')
               wx.showToast({
          title: '账号或密码不正确',
          icon: "none"
        })
      }else{
        console.log(resp, 'loginUser')
        
        wx.setStorageSync('userid', resp.result.data[0]._id)
        wx.switchTab({
          url: '/pages/class/index/index',
        })
        userStore.init(resp.result.data[0]) // 成功全局保存参数了 其他地方获取 userStore就能使用用户数据
      }
    }).catch((e) => {
      console.log(e);
          wx.showToast({
      title: '账号不存在',
      icon:"none"
    })
    });
  },

  clickSignup: function() {
      
    wx.navigateTo({
      url: '/pages/login/register/index',
    })
  },

  checkPhone: function() {
    console.log('触发检测')
    if(this.data.account.length!=11) {
      this.setData({
        error_message: '*手机号应为11位'
      })
    } else {
      this.setData({
        error_message: ''
      })
    }
  }
})