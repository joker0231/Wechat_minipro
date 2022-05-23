import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

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
            value: 'https://6c65-lemon-7glhwqyu5304e1f9-1311072024.tcb.qcloud.la/chinese.png?sign=1fe8346ef8e8954beea9f00c27b633f7&t=1651498768'
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
        }
    },
    data: {},
    methods: {
        onClickCollectedTrue: function() {
            Toast.success('收藏成功');
            wx.cloud.callFunction({
              name: 'classFunctions',
              config: {
                env: 'lemon-7glhwqyu5304e1f9'
              },
              data: {
                type: "createCollectClass",
                body: {
                  "_id" : this.data._id,
                  "author" : this.data.author,
                  "detail" : this.data.detail,
                  "grade" : this.data.grade,
                  "introduction" : this.data.introduction,
                  "is_collected" : this.data.is_collected,
                  "semester" : this.data.semester,
                  "subject" : this.data.subject,
                  "title" : this.data.title,
                  "user_id": wx.getStorageSync("userid")
                }
              }
            }).then((resp) => {
              console.log(resp, 'createCollectClass')
            }).catch((e) => {
              console.log(e);
            });
            // 一个是前端样式改变 
            // 二个是后端数据存储 最好刷新整个外面的Array 涉及到子父通信了
            this.setData({
                is_collected: true
            })
        },
        onClickCollectedFalse: function() {
            Toast.success('取消收藏成功');
            wx.cloud.callFunction({
              name: 'classFunctions',
              config: {
                env: 'lemon-7glhwqyu5304e1f9'
              },
              data: {
                type: "deleteCollectClass",
                _id: this.data._id
              }
            }).then((resp) => {
              console.log(resp, 'deleteCollectClass')
            }).catch((e) => {
              console.log(e);
            });
            this.setData({
                is_collected: false
            })
        },
        onClickToDetail: function() {
            if(this.properties.type === 'class') {
                wx.navigateTo({
                    url: '/pages/class/class_detail/index',
                })
            } else if (this.properties.type === 'extend') {
                wx.navigateTo({
                    url: '/pages/class/extend_detail/index',
                })
            }
            
        }
    }
});
