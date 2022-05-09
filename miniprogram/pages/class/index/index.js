Page({
    data: {
        navState: 0,
        classArray: [
            {
                title: '语文',
                subArray: ['1', '2', '3']
            },
            {
                title: '数学',
                subArray: ['1']
            },
            {
                title: '外语',
                subArray: ['1']
            }
        ],
        extendArray: [
            {
                title: '视频',
                subArray: ['1', '2']
            },
            {
                title: '文本',
                subArray: ['1']
            }
        ]
    },
    onLoad: function (options) {

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
    }
});