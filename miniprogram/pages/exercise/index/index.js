Page({
    data: {
        navState: 0,
        grade: "一年级",
        subject: "语文"
    },
    onLoad: function (options) {
        this.getExerciseByGrade()
    },

    navSwitch: function(e) {
        // console.log(e.currentTarget.dataset.index)
        let index = e.currentTarget.dataset.index;
        this.setData({
            navState:index
        })
    },

    getExerciseByGrade:function(){
        wx.cloud.callFunction({
            name: 'exerciseFunctions',
            config: {
              env: 'lemon-7glhwqyu5304e1f9'
            },
            data: {
              type: "getExerciseAll",
              grade: this.data.grade,
              subject: this.data.subject
            }
          }).then((resp) => {
            let exerciseData = resp.result.data[0].content
            console.log(exerciseData)
          }).catch((e) => {
        console.log(e);
      });
    }
});