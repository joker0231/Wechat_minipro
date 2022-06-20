const userStore = require('../../../stores/user-store')
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify'
import fetchYun from '../../../utils/fetchYun'
Page({
    data: {
        index: null,
        grade: "一年级",
        navState: 0,
        showgrade:false,
        gradebgcolor: '#dfdfdf',
        classArray: null,
        extendArray: null,
        staticGame: [  // 我的想法是数据库传递的，这里先写死三个模块 感觉游戏更多更好
          {title: '组词游戏', link: 'https://ekko306.top/game1/', color: 'lightgreen', coverImage: 'https://cdn.ekko306.top/wx/bottom-cover.png'}, 
          {title: 'westore贪吃蛇', link: '/pages/class/game_static/snake/game', color: 'orange', coverImage: 'https://cdn.ekko306.top/wx/tanchishe-cover.png'}, 
          {title: '学习博客', link: 'https://ekko306.top', color: 'yellow', coverImage: 'https://cdn.ekko306.top/daitu.png'}, 
        ],
        userCollectClass: []
    },
    onShow: function (options) {
      
      if(wx.getStorageSync('hasWelcome') !== 'true') {
        const userData = userStore.getUserData()
        console.log(userData, '用户westore数据')
        const kindMap = new Map([['teacher', '教师'], ['student', '学生']])
        const colorMap = new Map([['teacher', 'primary'], ['student', 'success']])
        let string = '欢迎' + kindMap.get(userData.kind)+ userData.nickname + '登录！'
        Notify({
          type: colorMap.get(userData.kind),
          message: string
        })        
        wx.setStorageSync('hasWelcome', 'true')
      }
      

      this.getClassByGrade()

      
      
      
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

    onClickToDetail: function(event) {
        if(event.currentTarget.dataset.type === 'class') {
          wx.navigateTo({
            url: '/pages/class/class_detail/index?classId=' + event.currentTarget.dataset.classid,
          })
        } else if (event.currentTarget.dataset.type === 'extend') {
            wx.navigateTo({
                url: '/pages/class/extend_detail/index?classId=' + event.currentTarget.dataset.classid,
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
      
      fetchYun('personFunctions', {
        type: "getUserCollectByType",
        collectType: 'class',
        userId: userStore.getUserData()._id
      }).then(resp => {
        let collectArr = resp.result.data      // 这个是浅拷贝还是深拷贝？
        console.log(collectArr, '这个是用户收藏信息')
        let userCollectClassId = []       // 用户的所有收藏了的课程的id
        let userCollectClassTableId = []          // 这个是收藏表的id

        collectArr.forEach(e=>{
          userCollectClassId.push(e.class_info._id)
          userCollectClassTableId.push(e._id)
        })
        console.log(userCollectClassId, 'userCollectClassId')

        // 获取普通课程 并进行收藏处理
        fetchYun('classFunctions', {
          type: "getClassByGrade",
          grade: this.data.grade
        }).then((resp) => {
          let classData = resp.result.data
          let chinese = []
          let math = []
          let english = []
          let physics = []
          let chemical = []
          let biology = []
          classData.forEach(element => {
            if(userCollectClassId.indexOf(element._id) !== -1) {       // 这个课程在我们的收藏表里
              element.is_collected = true       // 前端设置成true展示 不涉及后端
              element.collect_class_id = userCollectClassTableId[userCollectClassId.indexOf(element._id)]
            }
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
        })

        // 获取收藏课程 并进行收藏处理
        fetchYun('classFunctions', {
          type: "getExpandclassByGrade",
          grade: this.data.grade
        }).then((resp) => {
          let expandclassData = resp.result.data

          expandclassData.forEach(element=>{
            if(userCollectClassId.indexOf(element._id) !== -1) {       // 这个课程在我们的收藏表里
              element.is_collected = true       // 前端设置成true展示 不涉及后端
              element.collect_class_id = userCollectClassTableId[userCollectClassId.indexOf(element._id)]
            }
          })
          this.setData({
            extendArray:expandclassData
        })
        }).catch((e) => {
          console.log(e);
        });
        this.setData({
            showgrade:false
        })
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
            wx.navigateTo({
              url: '/pages/class/game_webview/index' + '?link=' + link ,
            })
        } else {
            console.log(link, '本地')
            wx.navigateTo({
              url: link,
            })
            wx.navigateTo({
              url: link,
            })
        }
    }
});

