const userStore = require('../../../stores/user-store')
Page({
    data: {
      collectClass: [],
      collectExercise: [],
      collectPost: [],
      empty_showclass: false,
      empty_showpost: false,
      empty_showexericise: false,
    },
    onLoad: function (options) {
      wx.cloud.callFunction({
        name: 'personFunctions',
        config: {
          env: 'lemon-7glhwqyu5304e1f9'
        },
        data: {
          type: "getUserCollectByType",
          collectType: 'class',
          userId: userStore.getUserData()._id
        }
      }).then((resp) => {
        console.log(resp)
        if(resp.result.data.length){
        this.setData({
          collectClass: resp.result.data
        })
        }else{
          this.setData({
            empty_showclass: true,
          })
        }
      }).catch((e) => {
        console.log(e);
      });

      wx.cloud.callFunction({
        name: 'personFunctions',
        config: {
          env: 'lemon-7glhwqyu5304e1f9'
        },
        data: {
          type: "getUserCollectByType",
          collectType: 'exercise',
          userId: userStore.getUserData()._id
        }
      }).then((resp) => {
        console.log(resp)
        if(resp.result.data.length){
          this.setData({
            collectExercise: resp.result.data
          })
          }else{
            this.setData({
              empty_showexericise: true,
            })
          }
      }).catch((e) => {
        console.log(e);
      });

      wx.cloud.callFunction({
        name: 'personFunctions',
        config: {
          env: 'lemon-7glhwqyu5304e1f9'
        },
        data: {
          type: "getUserCollectByType",
          collectType: 'topic',
          userId: userStore.getUserData()._id
        }
      }).then((resp) => {
        console.log(resp)
        if(resp.result.data.length){
          this.setData({
            collectPost: resp.result.data
          })
          }else{
            this.setData({
              empty_showpost: true,
            })
          }
      }).catch((e) => {
        console.log(e);
      });
    }
});