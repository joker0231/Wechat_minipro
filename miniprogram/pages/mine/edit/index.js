const userStore = require("../../../stores/user-store")
import fetchYun from '../../../utils/fetchYun'
Page({
    data: {
        showname: false,
        showsex: false,
        showschool: false,
        showgrade: false,
        showclass: false,
        showphone: false,
        avatar: '',
        nickname: '',
        sex: '',
        school: '',
        grade: '',
        class: null,
        account: '',
        index: null,
    },
    onLoad: function (options) {
    },

    selectApply: function (e) {
        let index = e.target.dataset.index
        let grade = e.target.dataset.grade
        this.setData({
            index: index,
            grade: grade
        })
        console.log(index)
    },

    onShow: function (options) {
        this.setData({
            avatar: userStore.getUserData().avatar,
            nickname: userStore.getUserData().nickname,
            sex: userStore.getUserData().sex,
            school: userStore.getUserData().educationInfo.school,
            grade: userStore.getUserData().educationInfo.grade,
            class: userStore.getUserData().educationInfo.class,
            account: userStore.getUserData().account
        })
    },

    changeAvatar: function () {
        var that = this;
        wx.chooseImage({
            count: 1, // 最多可以选择的图片张数
            sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function (res) {
                var avatar = res.tempFilePaths;
                that.setData({
                    avatar: avatar
                })
                
                fetchYun('userFunctions', {
                  type: "updateUser",
                  _id: userStore.getUserData()._id,
                  avatar: avatar
                }).then(resp => {
                    console.log('更新头像', resp)
                })
            },
        })
    },

    changeName: function () {
      fetchYun('userFunctions', {
        type: "updateUser",
        _id: userStore.getUserData()._id,
        nickname: this.data.nickname
      }).then(resp => {
          console.log('更新姓名', resp)
          wx.showToast({
              title: '修改姓名成功',
              icon: 'success'
          })
          this.setData({
              showname:false
          })
      })
    },

    changeSchool: function () {
      
      fetchYun('userFunctions', {
        type: "updateUser",
        _id: userStore.getUserData()._id,
        educationInfo:{
            "school": this.data.school,
            "grade":this.data.grade,
            "class": this.data.class
        } 
    }).then(resp => {
            console.log('更新学校', resp)
            wx.showToast({
                title: '修改学校成功',
                icon: 'success'
            })
            this.setData({
                showschool:false
            })
        })
    },

    changeGrade: function () {
      
      fetchYun('userFunctions', {
        type: "updateUser",
        _id: userStore.getUserData()._id,
        educationInfo:{
            "school": this.data.school,
            "grade":this.data.grade,
            "class": this.data.class
        }
    }).then(resp => {
            console.log('更新年级', resp)
            wx.showToast({
                title: '修改年级成功',
                icon: 'success'
            })
            this.setData({
                showgrade:false
            })
        })
    },

    changeClass: function () {
      
      fetchYun('userFunctions', {
        type: "updateUser",
        _id: userStore.getUserData()._id,
        educationInfo: {
            "school": this.data.school,
            "grade":this.data.grade,
            "class": this.data.class
        }
    }).then(resp => {
            console.log('更新班级', resp)
            wx.showToast({
                title: '修改班级成功',
                icon: 'success'
            })
            this.setData({
                showclass:false
            })
        })
    },

    changeAccount: function () {
      
      fetchYun('userFunctions', {
        type: "updateUser",
        _id: userStore.getUserData()._id,
        account: this.data.account
    }).then(resp => {
            console.log('更新手机号', resp)
            wx.showToast({
                title: '修改手机号成功',
                icon: 'success'
            })
            this.setData({
                showphone:false
            })
        })
    },

    getAccount(event) {
        this.setData({
            account: event.detail.value
        })
    },

    changetoMan(event) {
        this.setData({
            sex: "男",
            showsex: false
        })

        
        fetchYun('userFunctions', {
          type: "updateUser",
          _id: userStore.getUserData()._id,
          sex: '男'
      }).then(resp => {
            console.log(resp)
        })
    },

    changetoWoman(event) {
        this.setData({
            sex: "女",
            showsex: false
        })

        
        fetchYun('userFunctions', {
          type: "updateUser",
          _id: userStore.getUserData()._id,
          sex: '女'
      }).then(resp => {
            console.log(resp)
        })
    },

    getNickname(event) {
        this.setData({
            nickname: event.detail.value
        })
        console.log(this.data.nickname)
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

    getGrade(event) {
        this.setData({
            grade: event.detail.value
        })
    },

    showname: function () {
        this.setData({
            showname: true
        })
    },
    closename: function () {
        this.setData({
            showname: false
        })
    },
    closeschool: function () {
        this.setData({
            showschool: false
        })
    },
    showschool: function () {
        this.setData({
            showschool: true
        })
    },
    showsex: function () {
        this.setData({
            showsex: true
        })
    },
    closesex: function () {
        this.setData({
            showsex: false
        })
    },
    showschool: function () {
        this.setData({
            showschool: true
        })
    },
    closeschool: function () {
        this.setData({
            showschool: false
        })
    },
    showgrade: function () {
        this.setData({
            showgrade: true
        })
    },
    closegrade: function () {
        this.setData({
            showgrade: false
        })
    },
    showclass: function () {
        this.setData({
            showclass: true
        })
    },
    closeclass: function () {
        this.setData({
            showclass: false
        })
    },
    showphone: function () {
        this.setData({
            showphone: true
        })
    },
    closephone: function () {
        this.setData({
            showphone: false
        })
    }
});