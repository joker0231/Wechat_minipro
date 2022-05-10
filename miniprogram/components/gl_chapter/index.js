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
        }
    },
    data: {
        isShow: false,
        section: ['1.1 xxxxx','1.2 xxxxxx','1.3 xxxxxx']
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
        clickToQuizOnline: function() {
            if(this.data.forExercise) {
                wx.navigateTo({
                    url: '/pages/exercise/exercise_online/index',
                })
            }
            
        }
    }
});
