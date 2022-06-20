import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
const userStore = require('../../stores/user-store')
import fetchYun from '../../utils/fetchYun'
const photoMap = new Map([
  ['语文', 'https://6c65-lemon-7glhwqyu5304e1f9-1311072024.tcb.qcloud.la/chinese.png?sign=1fe8346ef8e8954beea9f00c27b633f7&t=1651498768'],
  ['数学', 'https://6c65-lemon-7glhwqyu5304e1f9-1311072024.tcb.qcloud.la/math.png?sign=627ef6201e5a411e9c150d653041f5bc&t=1655713748'],
  ['英语', 'https://6c65-lemon-7glhwqyu5304e1f9-1311072024.tcb.qcloud.la/english.png?sign=fba9b2c580e6567587995db64bbd0d15&t=1655713774']
])

Component({
    externalClasses: ['inner-class'],
    properties: {
        _id: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: '标题'
        },
        introduction: {
            type: String,
            value: '简短简介'
        },
        photo: {
            type: String,
            value:  photoMap.get('语文')
        },
        author: {    
            type: String,
            value: '教师名称'
        },
        detail: {    
          type: String,
          value: ''
      },
        grade: {    
            type: String,
            value: ''
        },
        semester: {    
            type: Number,
            value: 0
        },
        is_collected: {
            type: Boolean,
            value: false
        },
        type: {   // 类型是 分 class专业课 和 extend拓展课 样式相同 跳转链接和逻辑不同
            type: String,
            value: 'class'
        },
        collect_class_id: {
          type: String,
          value: ''                   // 收藏表的id 没有收藏默认是空字符串
        }
    },
    data: {},
    methods: {
        onClickCollectedTrue: function() {
            Toast.success('收藏成功');

            console.log('要收藏的数据!!', this.data)
            fetchYun('classFunctions', {
              type: "createCollectClass",
              userId: userStore.getUserData()._id,
              classInfoBody: {
                "_id": this.data._id,
                "type": this.data.type,
                "title" : this.data.title,
                "semester" : this.data.semester,
                "photo": this.data.photo,
                "is_collected" : true,
                "introduction" : this.data.introduction,
                "grade" : this.data.grade,
                "detail" : this.data.detail,
                "author" : this.data.author,
                "collect_class_id": this.data.collect_class_id
              }
            }
            ).then((resp) => {
              console.log(resp, 'createCollectClass')
            })

            // 一个是前端样式改变 
            // 二个是后端数据存储 最好刷新整个外面的Array 涉及到子父通信了
            this.setData({
                is_collected: true
            })
        },
        onClickCollectedFalse: function() {
            Toast.success('取消收藏成功');
            console.log(this.data)
            fetchYun('classFunctions', {
              type: "deleteCollectClass",
              _id: this.data.collect_class_id       // 取消收藏的id是这个吗？
            }).then((resp) => {
              console.log(resp, 'deleteCollectClass')
            }).catch((e) => {
              console.log(e);
            });

            this.setData({
                is_collected: false
            })
        },
        // onClickToDetail: function() {
        //   const _id = this.data._id
        //     if(this.properties.type === 'class') {
        //         wx.navigateTo({
        //             url: '/pages/class/class_detail/index',
        //             success: function(res) {
        //               // 通过 eventChannel 向被打开页面传送数据
        //               res.eventChannel.emit('acceptDataFromOpenerPage', { data: _id})
        //             }
        //         })
        //     } else if (this.properties.type === 'extend') {
        //         wx.navigateTo({
        //             url: '/pages/class/extend_detail/index',
        //         })
        //     }
            
        // }
    },
    lifetimes: {
      attached: function() {
        // 这里是class组件给photo设置语文数学啥的图片 对于expand课程 原本父亲处理 这里也放这里处理 内部逻辑放里面
        // 在组件实例进入页面节点树时执行
        if(this.properties.type === 'class') {
          this.setData({
            photo: photoMap.get(this.properties.title.slice(0,2))
          })
        } else {
            const {detail} = this.properties
            let photo = detail.match(/<img [^>]*src="[^"]*"[^>]*>/gm).map(x => x.replace(/.*src="([^"]*)".*/, '$1'))[0]
            this.setData({photo})
        }
        
      }
    }
});
