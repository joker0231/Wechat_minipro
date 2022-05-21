import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

Component({
    externalClasses: ['inner-class'],
    properties: {
        classId: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: '标题'
        },
        brief_intro: {
            type: String,
            value: '简短简介'
        },
        photo: {
            type: String,
            value: 'https://6c65-lemon-7glhwqyu5304e1f9-1311072024.tcb.qcloud.la/chinese.png?sign=1fe8346ef8e8954beea9f00c27b633f7&t=1651498768'
        },
        teacher_name: {      // 建议和数据库的名称一致 减少自己的负担
            type: String,
            value: '教师名称'
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
            // 一个是前端样式改变 
            // 二个是后端数据存储 最好刷新整个外面的Array 涉及到子父通信了
            this.setData({
                is_collected: true
            })
        },
        onClickCollectedFalse: function() {
            Toast.success('取消收藏成功');
            // 一个是前端样式改变 
            // 二个是后端数据存储 最好刷新整个外面的Array 涉及到子父通信了
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
