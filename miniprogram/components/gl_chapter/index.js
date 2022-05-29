Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        chapter_num:String,
        showLucky: {
            type: Boolean,
            value: true
        },
        forExercise: {
            type: Boolean,
            value: false
        },
        section: Array
    },
    data: {
        isShow: false,
    },
    methods: {
        changeshow: function (){
            if (this.data.isShow){
                this.setData({
                    isShow:false
                })
            }else {
                this.setData({
                    isShow:true
                })
            }
        },
        clickToQuizOnline: function(e) {
            console.log(e.target.dataset)
            if(this.data.forExercise) {
                wx.navigateTo({
                    url: '/pages/exercise/exercise_online/index',
                    success: function(res) {
                        // 通过 eventChannel 向被打开页面传送数据
                        res.eventChannel.emit('acceptDataFromOpenerPage', { section: e.target.dataset.section,chapter:this.data.chapter_num})
                    }
                })
            }else{
                this.triggerEvent('changevideo', { param: e.target.dataset.href});
            }
            
        }
    }
});
