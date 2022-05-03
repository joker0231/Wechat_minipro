Component({
    properties: {
        chapter_num:{
            type: Number,
            value: null
        }
    },
    data: {
        isShow: false,
        section: ['1.1 xxxxx','1.2 xxxxxx','1.3 xxxxxx']
    },
    methods: {
        changeshow: function (){
            console.log(chapter_num)
            if (this.data.isShow){
                this.setData({
                    isShow:false
                })
            }else {
                this.setData({
                    isShow:true
                })
            }
        }
    }
});
