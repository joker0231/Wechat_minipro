Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        chapter_num:String,
        grade:String,
        subject: String,
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
            const data = {
                section: e.target.dataset.section,
                subject:this.data.subject,
                grade: this.data.grade,
                section_id: e.target.dataset.id,
            }
            this.triggerEvent('clickTopBar', data)
            if(!this.data.forExercise) {
                this.triggerEvent('changevideo', { param: e.target.dataset.href});
            }
        }
    }
});
