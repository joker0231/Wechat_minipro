Page({
  data: {
    index: null,
    navState: 0,
    grade: "一年级",
    showgrade: false,
    is_senior: false,
    gradebgcolor: '#dfdfdf',
    subject: "语文",
    exercise_catalog: [],
  },
  onLoad: function (options) {
    this.getExerciseByGrade()
  },

  navSwitch: function (e) {
    let index = e.currentTarget.dataset.index;
    let subject = e.currentTarget.dataset.subject;
    this.setData({
      navState: index,
      subject: subject
    })
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
      if (resp.result.data.length == 0) {
        this.setData({
          exercise_catalog: resp.result.data
        })
      } else {
        let exerciseData = resp.result.data[0].content
        this.setData({
          exercise_catalog: exerciseData
        })
      }
    }).catch((e) => {
      console.log(e);
    });
  },

  clickToExerciseRecord: function () {
    wx.navigateTo({
      url: '/pages/mine/record/index',
    })
  },

  showgrade: function () {
    this.setData({
      showgrade: true
    })
  },

  closegrade: function () {
    this.setData({
      showgrade: false
    })
  },

  selectApply: function (e) {
    let index = e.target.dataset.index
    let grade = e.target.dataset.grade
    this.setData({
      index: index,
      grade: grade
    })
  },

  getExerciseByGrade: function () {
    if (this.data.grade == ("初一" || "初二" || "初三")) {
      this.setData({
        is_senior: true
      })
    } else {
      this.setData({
        is_senior: false
      })
    }
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
      if (resp.result.data.length == 0) {
        this.setData({
          exercise_catalog: resp.result.data
        })
      } else {
        let exerciseData = resp.result.data[0].content
        this.setData({
          exercise_catalog: exerciseData
        })
      }
    }).catch((e) => {
      console.log(e);
    });

    this.setData({
      showgrade: false
    })
  }
});