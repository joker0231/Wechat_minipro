Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    lifetimes: {
        ready: function() {
            if(this.properties.type == "课程"){
                this.setData({
                    src: this.data.allsrc[0]
                })
            } else if(this.properties.type == "拓展"){
                this.setData({
                    src: this.data.allsrc[1]
                })
            }else {
                this.setData({
                    src: this.data.allsrc[2]
                })
            }
        },
    },
    properties: {
        name:String,
        info:String,
        content:String,
        like:String,
        comment:String,
        favour:String,
        type:String
    },
    data: {
        allsrc :["https://6c65-lemon-7glhwqyu5304e1f9-1311072024.tcb.qcloud.la/img1650631053868.png?sign=190a587faee454f47c41de09728a404e&t=1651712992","https://6c65-lemon-7glhwqyu5304e1f9-1311072024.tcb.qcloud.la/img1650630846878.png?sign=46f2b748daf2bfb88af67f2080f3bb66&t=1651713020","https://6c65-lemon-7glhwqyu5304e1f9-1311072024.tcb.qcloud.la/img1650631059155.png?sign=186ffea85df0ed45f56425c66c0cb11d&t=1651713037"],
        src: ""
    },
    methods: {
        posttype:function (){

        }
    }
});
