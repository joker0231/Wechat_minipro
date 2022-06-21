// pages/community/post_new/index.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
const userStore = require('../../../stores/user-store')

const allType = {
  普通: [''],
  拓展: ['拓展课1', '拓展课2', '拓展课3'],
  课程: ['语文六年级上册', '语文六年级下册', '数学六年级上册', '数学六年级下册'],
  题目: ['最近做过的题目1', '最近做过的题目2', '最近做过的题目3']
};

const typeMap = new Map([['普通', 'common'], ['拓展', 'extend'], ['课程', 'class'], ['题目', 'exercise']])

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [
      {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        name: '图片1',
      },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
    ],
    message: '',
    columns: [
      {
        values: Object.keys(allType),
        className: 'column1',
      },
      {
        values: allType['普通'],
        className: 'column2',
        defaultIndex: 2,
      },
    ],
    show: false,
    typeValue: []
    
  },
  onChange(event) {
    // 分两个逻辑 如果改变第一行 就设置第二个参数为第一行的第二个
    // 如果改变第二行 就把第二行改进去
    const { picker, value, index } = event.detail;


    if(value[0] !== this.data.typeValue[0]) {        // 改变了第一行
      picker.setColumnValues(1, allType[value[0]]);
      let copyValue = [...value]
      copyValue[1] = allType[value[0]][0]
      this.setData({
        typeValue: copyValue
      }, ()=>{
        console.log(this.data.typeValue)
      })
    } else {        // 改变了第二行
      this.setData({
        typeValue: value
      }, ()=>{
        console.log(this.data.typeValue)
      })
    }
    
  },

  onClose() {
    this.setData({ show: false });
  },

  chooseType() {
    this.setData({ 
      show: true,
      typeValue: ["普通", ""]
    });
  },

  afterRead(event) {
    // 这里原本是发帖上传用的 需求砍掉了就暂时不用了
    const { file } = event.detail;
    console.log(file)
    // 要判断type是图片 否则报错
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.url,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   },
    // });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // Dialog.alert({
    //   title: '类型选择',
    //   message: '帖子类型选择默认为最近浏览记录，若要更全类型可去具体页面右上角发帖！',
    // }).then(() => {
    //   // on close
    // });
    // this.setData
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


  clickPost: function() {
    let postData = {
      "collect_num": 0,
      "content": '',
      "date": "2011-06-14",
      "link_id": "",
      "comment_num": 0,
      "like_num": 0,
      "topic_location": {
      },
      "type": "",
      "user_id": userStore.getUserData()._id
    }
    postData.content = this.data.message
    postData.type = typeMap.get(this.data.typeValue[0])

    var date = new Date();
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds(); 
    console.log(Y+M+D+h+m+s); //呀麻碟
    postData.date = Y+M+D+h+m+s

    console.log(postData)
    if(!postData.content || !postData.type) {
      Dialog.alert({
        title: '发帖失败',
        message: '请选择类型或填写帖子内容！',
      }).then(() => {
        // on close
      });
    } else {
      fetchYun('communityFunctions', {
        type: "createNewPost",
        body: postData
      }).then((resp) => {
        console.log(resp, 'createNewPost')
        // console.log(JSON.stringify(resp.result.data[0]), '123')
        Toast({
          duration: 1000,
          message: '发布成功'
        })
        setTimeout(()=>{
          wx.navigateBack()
        }, 1000)
      }).catch((e) => {
        console.log(e);
      });
    }
    

    
  }
})