Page({
    data: {},
    onLoad: function (options) {

    },
    clickToZone: function() {
        console.log(123)
        wx.navigateTo({
          url: '/pages/community/classzone/index',
        })
    },
    clickToChat: function() {
      wx.navigateTo({
        url: '/pages/community/chat/index',
      })
    },

    clickToNewPost: function() {
      wx.navigateTo({
        url: '/pages/community/post_new/index',
      })
    },

    clickToDetail: function() {
      wx.navigateTo({
        url: '/pages/community/post_detail/index',
      })
    }
});