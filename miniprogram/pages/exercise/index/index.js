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
    data: {},
    exercise_catalog_fakeyuwen1gradeXia: {
      "_id": "6d85a2b96287406705a6b497075dcea9",
      "content": [
          {
              "chapter": "第一单元 识字",
              "exerciseSection": [
                  {
                      "ifDone": false,
                      "section": "1",
                      "title": "我是中国人"
                  },
                  {
                      "ifDone": false,
                      "section": "1.2",
                      "title": "我是小学生"
                  }
              ]
          },
          {
              "chapter": "第二单元 课文",
              "exerciseSection": [
                  {
                      "title": "null",
                      "ifDone": false,
                      "section": "2.1"
                  }
              ]
          },
          {
              "chapter": "第三单元 课文",
              "exerciseSection": [
                  {
                      "title": "null",
                      "ifDone": false,
                      "section": "2.1"
                  }
              ]
          }
      ],
      "grade": "一年级",
      "subject": "语文"
    },
    exercise_catalog_fakeyuwen6gradeXia: {
      "_id": "6d85a2b96287406705a6b497075dcea8",
      "content": [
          {
              "chapter": "第一单元",
              "exerciseSection": [
                  {
                      "ifDone": false,
                      "section": "1.1",
                      "title": "第一节"
                  },
                  {
                      "ifDone": false,
                      "section": "1.2",
                      "title": "第二节"
                  }
              ]
          },
          {
              "chapter": "第二单元",
              "exerciseSection": [
                  {
                      "title": "null",
                      "ifDone": false,
                      "section": "2.1"
                  }
              ]
          },
          {
              "chapter": "第三单元",
              "exerciseSection": [
                  {
                      "title": "null",
                      "ifDone": false,
                      "section": "2.1"
                  }
              ]
          }
      ],
      "grade": "六年级",
      "subject": "语文"
    }
  
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
  },

  clickme:function(e){
    this.setData({
      data: e.detail
    })
    console.log(e.detail)
    // {section: "2", subject: "语文", grade: "六年级", section_id: "058dfefe629c9f5f075850e76db642ce"} 我加了section_id 到具体练习用_id查数据表
    let queryBean = JSON.stringify(this.data.data)
      wx.navigateTo({
        url: '/pages/exercise/exercise_online/index?queryBean=' + queryBean,
      })

      // wx.navigateTo({
      //   url: '/pages/exercise/exercise_online/index?queryId=' + e.detail.section_id,
      // })
  },
});