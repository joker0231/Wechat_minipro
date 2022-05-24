Page({
    data: {
        navState: 0,
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
});