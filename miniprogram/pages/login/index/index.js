const userStore = require('../../../stores/user-store')
import { genTestUserSig } from '../../../debug/GenerateTestUserSig'
import logger from '../../../utils/logger'
import { setTokenStorage } from '../../../utils/token'
const app = getApp()
import fetchYun from '../../../utils/fetchYun'

// pages/index/community_headpic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '33333333333',
    password: '123456',
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

    loginIm(databaseData) {
      // const userID = this.data.account
      // const userSig = genTestUserSig(userID).userSig
      // console.log(`TUI-login | login  | userSig:${userSig} userID:${userID}`)
      // app.globalData.userID = userID
      // app.globalData.userSig = userSig
      // var tim = app.globalData.tim
      // let promise = tim.login({userID: userID, userSig: userSig});
      // promise.then(function(imResponse) {
      //   console.log(imResponse)
      //   console.log('登录成功')
      //   wx.setStorageSync('isImLogin', true)
      //   app.globalData.isImLogin = true
      // }).catch(function(imError) {
      //   wx.showToast({
      //     title: 'login error' + imError,
      //     icon: 'none',
      //     duration: 3000
      //   })
      //   console.warn('login error:', imError); // 登录失败的相关信息
      // })
      const userID = this.data.account
      const userSig = genTestUserSig(userID).userSig
      logger.log(`TUI-login | login  | userSig:${userSig} userID:${userID}`)
      app.globalData.userInfo = {
        userSig,
        userID,
      }
      setTokenStorage({
        userInfo: app.globalData.userInfo,
      })
      wx.$TUIKit.login({userID: userID, userSig: userSig})
      .then((res)=>{
        console.log(res, '登录成功')
      })
      .catch((err)=>{console.log(err, '登录失败')})
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

    
    fetchYun('userFunctions', {
      type: "loginUser",
      account: this.data.account,
      password: this.data.password
    }).then((resp) => {
      if(resp.result.errMsg=="账号或密码错误！"){
        console.log(resp, 'loginUser')
               wx.showToast({
          title: '账号或密码不正确',
          icon: "none"
        })
      }else{
        wx.setStorageSync('userid', resp.result.data[0]._id)
        // 这里获取用户数据存储到IM里去
        this.loginIm(resp.result.data[0])
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