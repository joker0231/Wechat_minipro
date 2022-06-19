// pages/class/class_search/index.js
import fetchYun from '../../../utils/fetchYun'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    searchKey: '',
    result: [],
    tags: []
  },

  onChange: function (e) {
    console.log(e)
    let value = e.detail //搜索框输入的信息
    this.setData({
      searchKey: value //监听搜索输入关键字信息
    })
  },

  onConfirm: function (e) {
    let value = e.detail //搜索框输入的信息
    this.setData({
      searchKey: value //监听搜索输入关键字信息
    })
    let searchKey = this.data.searchKey //监听搜索框输入的信息
    if (searchKey == '') { //如果不输入任何字符直接搜索，返回提示信息
      wx.showToast({
        title: '请输入关键词',
        icon: "error"
      })
      return
    }

    

    fetchYun('classFunctions', {
      type: "createSearchHistory",
      body:{
        keyword:searchKey
      }
    }).then((resp) => {
      console.log(resp, 'createSearchHistory')

      

      fetchYun('classFunctions', {
        type: "getSearchHistory"
      }).then((resp) => {
        console.log(resp, '搜索记录')
        this.setData({
          tags: resp.result.data
        })
      }).catch((e) => {
        console.log(e);
      });
    }).catch((e) => {
      console.log(e);
    });

    var db = wx.cloud.database() //连接msg数据库
    wx.cloud.init({
      env: 'lemon-7glhwqyu5304e1f9',
      traceUser: true,
    })    
    db.collection('class').where({
      title: db.RegExp({//按照KeyWord模糊查询
        regexp: searchKey, //模糊搜索监听到的搜索信息
        options: 'i', //不区分大小写
      })
    }).get().then(res => { //获取查询到的信息
      if (res.data.length == 0) { //如果搜索信息在数据库中找不到
        wx.showToast({
          title: '没有找到对应课程',
          icon: 'none'
        })
        return
      }

      var total = res.data.length //总匹配信息个数
      var _collections = new Array() //声明一个数组
      //console.log(total)
      //将匹配信息存入数组
      for (var i = 0; i < total; i++) {
        _collections.push(JSON.parse(JSON.stringify(res.data[i])))
      }
      this.setData({
        result: _collections
      })
      wx.navigateTo({
        url: '/pages/class/class_search/search_result/index',
        success: function(res) {
          // 通过 eventChannel 向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: _collections})
        }
    })
    }).catch(res => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onShow: function (options) {
    console.log(123123123123123)
    

    fetchYun('classFunctions', {
      type: "getSearchHistory"
    }).then((resp) => {
      console.log(resp, '搜索记录')
      this.setData({
        tags: resp.result.data
      })
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
    // event.detail 为当前输入的值
    // console.log(event.detail);
  },

  onClose(event) {
    let preData = this.data.tags
    preData.splice(event.target.id, 1)
    this.setData({
      tags: preData
    })

    

    fetchYun('classFunctions', {
      type: "deleteSearchHistory",
      _id : event.target.dataset._id
    }).then((resp) => {
      console.log(resp, 'deleteSearchHistory')
    }).catch((e) => {
      console.log(e);
    });
  },

  onConfirmTag(event) {
    console.log(event.target.dataset.value)
    var db = wx.cloud.database() //连接msg数据库
    wx.cloud.init({
      env: 'lemon-7glhwqyu5304e1f9',
      traceUser: true,
    })    
    db.collection('class').where({
      title: db.RegExp({//按照KeyWord模糊查询
        regexp: event.target.dataset.value, //模糊搜索监听到的搜索信息
        options: 'i', //不区分大小写
      })
    }).get().then(res => { //获取查询到的信息
      if (res.data.length == 0) { //如果搜索信息在数据库中找不到
        wx.showToast({
          title: '没有找到对应课程',
        })
        return
      }

      var total = res.data.length //总匹配信息个数
      var _collections = new Array() //声明一个数组
      //console.log(total)
      //将匹配信息存入数组
      for (var i = 0; i < total; i++) {
        _collections.push(JSON.parse(JSON.stringify(res.data[i])))
      }
      this.setData({
        result: _collections
      })
      wx.navigateTo({
        url: '/pages/class/class_search/search_result/index',
        success: function(res) {
          // 通过 eventChannel 向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: _collections})
        }
    })
    }).catch(res => {
      console.log(res)
    })
  },

  temp(){
    console.log('123')
  }
})