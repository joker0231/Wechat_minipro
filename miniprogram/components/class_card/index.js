import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

Component({
    externalClasses: ['inner-class'],
    properties: {
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
            wx.navigateTo({
              url: '/pages/class/class_detail/index',
            })
        }
    }
});
