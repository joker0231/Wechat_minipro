const userStore = require('../../../stores/user-store')
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify'

Page({
    data: {
        index: null,
        grade: "一年级",
        navState: 0,
        showgrade:false,
        gradebgcolor: '#dfdfdf',
        classArray: null,
        extendArray: null
    },
    onLoad: function (options) {
      this.getClassByGrade()
      const userData = userStore.getUserData()
      console.log(userData, '用户westore数据')
      const kindMap = new Map([['teacher', '教师'], ['student', '学生']])
      const colorMap = new Map([['teacher', 'primary'], ['student', 'success']])
      let string = '欢迎' + kindMap.get(userData.kind)+ userData.nickname + '登录！'
      Notify({
        type: colorMap.get(userData.kind),
        message: string
      })
    },
    selectApply:function(e){
      let index = e.target.dataset.index
      let grade = e.target.dataset.grade
       this.setData({
         index: index,
         grade: grade
       })
   },

    navSwitch: function(e) {
        // console.log(e.currentTarget.dataset.index)
        let index = e.currentTarget.dataset.index;
        this.setData({
            navState:index
        })
    },
    clickToSeach: function() {
        wx.navigateTo({
          url: '/pages/class/class_search/index',
        })
    },

    clickToClassRecord: function() {
        wx.navigateTo({
          url: '/pages/mine/record/index',
        })
    },

    clickToDetail(event) {
      
    },

    onClickToDetail: function(event) {
        if(event.currentTarget.dataset.type === 'class') {
          wx.navigateTo({
            url: '/pages/class/class_detail/index?classId=' + event.currentTarget.dataset.classid,
          })
        } else if (event.currentTarget.dataset.type === 'extend') {
            wx.navigateTo({
                url: '/pages/class/extend_detail/index',
            })
        }
    },

    showgrade:function (){
      this.setData({
          showgrade:true
      })
   },

    closegrade: function (){
      this.setData({
          showgrade:false
      })
    },

    getClassByGrade: function (){
      wx.cloud.callFunction({
        name: 'classFunctions',
        config: {
          env: 'lemon-7glhwqyu5304e1f9'
        },
        data: {
          type: "getClassByGrade",
          grade: this.data.grade
        }
      }).then((resp) => {
        let classData = resp.result.data
        let chinese = []
        let math = []
        let english = []
        let physics = []
        let chemical = []
        let biology = []
        classData.forEach(element => {
          if(element.subject=="语文"){
            chinese.push(element)
          }else if(element.subject=="数学"){
            math.push(element)
          }else if(element.subject=="英语"){
            english.push(element)
          }else if(element.subject=="物理"){
            physics.push(element)
          }else if(element.subject=="化学"){
            chemical.push(element)
          }else if(element.subject=="生物"){
            biology.push(element)
          }
        });
        if(this.data.grade==("初一"||"初二"||"初三")){
          this.setData({
            classArray: [
              {
                  title: '语文',
                  subArray: chinese
              },
              {
                  title: '数学',
                  subArray: math
              },
              {
                  title: '外语',
                  subArray: english
              },
              {
                  title: '物理',
                  subArray: physics
              },
              {
                  title: '化学',
                  subArray: chemical
              },
              {
                  title: '生物',
                  subArray: biology
              }
          ],
        })
        }else{
          this.setData({
          classArray: [
            {
                title: '语文',
                subArray: chinese
            },
            {
                title: '数学',
                subArray: math
            },
            {
                title: '外语',
                subArray: english 
            },
          ]
        })
        }
      }).catch((e) => {
        console.log(e);
      });

      wx.cloud.callFunction({
        name: 'classFunctions',
        config: {
          env: 'lemon-7glhwqyu5304e1f9'
        },
        data: {
          type: "getExpandclassByGrade",
          grade: this.data.grade
        }
      }).then((resp) => {
        let expandclassData = resp.result.data
        this.setData({
          extendArray:expandclassData
      })
      }).catch((e) => {
        console.log(e);
      });
      this.setData({
          showgrade:false
      })
    },

    clickToGame: function(e) {
        let link = e.currentTarget.dataset.link 
        // link可能两种参数，一种是：https://ekko306/game1 为webview
        // 另一种是： /pages/class/game_statc/snake/index 静态本地游戏
        if(/(http|https):\/\/([\w.]+\/?)\S*/.test(link)) { //网络 webview类型
            console.log(link, '网络')
            wx.navigateTo({
              url: '/pages/class/game_webview/index' + '?link=' + link ,
            })
        } else {
            console.log(link, '本地')
            wx.navigateTo({
              url: link,
            })
        }
    }
});

