Page({
    data: {
        navState: 2,
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
    },

    clickToGame: function(e) {
        let link = e.currentTarget.dataset.link 
        // link可能两种参数，一种是：https://ekko306/game1 为webview
        // 另一种是： /pages/class/game_statc/snake/index 静态本地游戏
        if(/(http|https):\/\/([\w.]+\/?)\S*/.test(link)) { //网络 webview类型
            console.log(link, '网络')
            wx.navigateTo({
              url: '/pages/class/game_webview/index' + '?link=' + link ,
            })
        } else {
            console.log(link, '本地')
            wx.navigateTo({
              url: link,
            })
        }
    }
});