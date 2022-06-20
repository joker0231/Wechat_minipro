// pages/register/community_headpic.js
import fetchYun from '../../../utils/fetchYun'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    account: "",
    password: "",
    sex: "男",
    kind: "student",
    school: "",
    grade: "",
    class: 0,
    speciality: [],
    register_student: "register_show",
    register_teacher: "register_hide",
    grade: '',
    gradelist: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三'],
    showgrade: false,
    show: false,
    imageCurrent: 0
  },

  showPopup() {
    if(this.data.imageCurrent === 0) {        // 一点技巧默认 失败的 让用户点击头像参数 点击第一次设置为1 以后如果不是首次失败 就直接打开
      this.setData({ show: true, imageCurrent: 1 });
    } else {
      this.setData({show: true})
    }
    
  },

  onClose() {
    this.setData({ show: false });
  },

  changeSwiper(event) {
    console.log(event)
    this.setData({
      imageCurrent: event.detail.current+1
    })
  },

  checkboxChange(e) {
    this.setData({
      speciality: e.detail.value
    })
  },

  getAccount(event) {
    this.setData({
      account: event.detail.value
    }, ()=>{console.log(this.data.account)})
  },

  getPassword(event) {
    this.setData({
      password: event.detail.value
    })
  },

  getName(event) {
    this.setData({
      name: event.detail.value
    })
  },

  getSpeciality(event) {
    this.setData({
      speciality: event.detail,
    });
  },

  changetoman(event) {
    this.setData({
      sex: "男"
    })
  },

  changetowoman(event) {
    this.setData({
      sex: "女"
    })
  },

  getSchool(event) {
    this.setData({
      school: event.detail.value
    })
  },

  getClass(event) {
    this.setData({
      class: event.detail.value
    })
  },

  getPassword(event) {
    this.setData({
      password: event.detail.value
    })
  },

  showgrade: function () {
    this.setData({
      showgrade: true
    })
  },

  onchangegrade(event) {
    const { value } = event.detail;
    this.setData({
      grade: value
    })
  },

  closegrade: function () {
    this.setData({
      showgrade: false
    })
  },

  changetostudent: function () {
    this.setData({
      kind: "student",
      register_student: "register_show",
      register_teacher: "register_hide"
    })
  },

  changetoteacher: function () {
    this.setData({
      kind: "teacher",
      register_student: "register_hide",
      register_teacher: "register_show"
    })
  },

  clickRegister: function () {
    if (this.data.account.length != 11) {
      console.log(this.data.account)
      wx.showToast({
        title: '手机号应为11位',
        icon: "none"
      })
      return
    }
    if (this.data.kind === 'student' && this.data.grade == "") {
      wx.showToast({
        title: '请输入年级',
        icon: "none"
      })
      return
    }

    fetchYun('userFunctions', {
      type: "createUser",
      body: {
        "account": this.data.account,
        "avatar": this.data.imageCurrent === 0 ? 'null' :'https://cdn.ekko306.top/wx/' + this.data.imageCurrent + '.jpg',
        "checkIn": "0",
        "educationInfo": {
          "class": this.data.class,
          "grade": this.data.grade,
          "school": this.data.school,
          "speciality": this.data.speciality,
        },
        "kind": this.data.kind,
        "nickname": this.data.name,
        "password": this.data.password,
        "sex":this.data.sex,
        "admin_status": "null",
        "admin_webId": "null"
      }
    }).then((resp) => {
      console.log(resp, 'loginUser')
      wx.showToast({
        title: '注册成功！',
        icon: "success"
      })
      setTimeout(()=> {
        wx.navigateBack({
          delta: 0,
        })
      }, 2000)
      
    }).catch((e) => {
      console.log(e);
      wx.showToast({
        title: '创建用户失败',
        icon: "none"
      })
    });
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