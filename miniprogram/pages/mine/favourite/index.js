const userStore = require('../../../stores/user-store')
import fetchYun from '../../../utils/fetchYun'
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
      
      fetchYun('personFunctions', {
        type: "getUserCollectByType",
        collectType: 'class',
        userId: userStore.getUserData()._id
      }).then((resp) => {
        console.log(resp, 123123123)

        let originArr = resp.result.data
        // 这里具体数据在class_info对象里 再处理一层
        let classInfoArr = originArr.map(e=>{
          return e.class_info
        })
        if(resp.result.data.length){
          this.setData({
            collectClass: classInfoArr
          })
        }else{
          this.setData({
            empty_showclass: true,
          })
        }
      }).catch((e) => {
        console.log(e);
      });

      fetchYun('personFunctions', {
        type: "getUserCollectByType",
        collectType: 'exercise',
        userId: userStore.getUserData()._id
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

      
      fetchYun('personFunctions', {
        type: "getUserCollectByType",
        collectType: 'topic',
        userId: userStore.getUserData()._id
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