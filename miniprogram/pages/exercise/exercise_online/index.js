// pages/exercise/online_quiz/index.js
const exerciseStore = require('../../../stores/exercise-store')
const userStore = require('../../../stores/user-store')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exercise: [],
    user_input: new Array(6).fill(null),         //这里有说法 我的选择题选择的顺序是 0~3 数据库存的正确答案是1~4 于是 我也统一0代表无正确答案（简答题）    比较答案哪里 数据库的值要减1 这也是没讨论清楚数据库的问题     
    current: 0,
    show: false, // 弹出答题卡
    section: null,
    chapter: '',
    subject: '',
    grade: '',
    wrong_exercise: [],
    correct: 0,
    title:''
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var queryBean = JSON.parse(options.queryBean)
    // this.setData({
    //     section: queryBean.section,
    //     subject: queryBean.subject,
    //     grade: queryBean.grade
    // }) // 这里合并到下面收到数据后了 还是有异步问题
    const {section, subject, grade, title, section_id} = queryBean

    this.setData({
      title: queryBean.title,
      section: queryBean.section,
    })

    wx.enableAlertBeforeUnload({
      message: "您的做题内容未提交报告 ，退出将丢失做题记录！未做完也可右上角直接提交查看结果！",
      success: function (res) {
        console.log("方法注册成功：", res);
      },
      fail: function (errMsg) {
        console.log("方法注册失败：", errMsg);
      },
    });

    wx.cloud.callFunction({
      name: 'exerciseFunctions',
      config: {
        env: 'lemon-7glhwqyu5304e1f9'
      },
      data: {
        type: "getExerciseList",
        grade: grade,
        subject: subject,
        section: section
      }
    }).then((resp) => {
      this.setData({
        exercise: resp.result.list
      })
    }).catch((e) => {
      console.log(e);
    });
    
    console.log(options)
    // wx.cloud.callFunction({
    //   name: 'exerciseFunctions',
    //   config: {
    //     env: 'lemon-7glhwqyu5304e1f9'
    //   },
    //   data: {
    //     type: "getExerciseListBySectionId",
    //     section_id: section_id,
    //   }
    // }).then((resp) => {
    //   console.log(resp, '测试id数据')
    //   this.setData({
    //     exercise: resp.result.data,
    //     section,
    //     subject,
    //     grade
    //   })
    // }).catch((e) => {
    //   console.log(e);
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  onChange(event) {
    this.setData({
      current: event.detail.current
    })
  },

  onClickPrev() {
    let prevIndex = this.data.current
    this.setData({
      current: prevIndex - 1
    })
  },

  onClickNext() {
    let prevIndex = this.data.current
    this.setData({
      current: prevIndex + 1
    })
  },

  judgeAnswer: function () {
    // const judge = [{ judge: false }, { judge: false }, { judge: false }, { judge: false }, { judge: false }, { judge: false }]
    const judge = Array.from({length: 6}, ()=>{return {judge: false}})
    for (let i = 0; i < this.data.exercise.length; i++) {
      if (this.data.user_input[i] === this.data.exercise[i].answer - 1) {   //数据库和前端代码不一致正确下标 左边是本地值 右边是数据库值 顺序好看好理解也有讲究
         judge[i].judge = true
      }
    }
    let newExerciseList = this.mergeObj(this.data.exercise, judge)

    console.log(newExerciseList, '测试测试改过之后的数据')
    this.setData({
      exercise: newExerciseList
    })
  },

  mergeObj: function (arr1, arr2) {
    // const result = []
    const copyOrigin = [...arr1] // 拷贝你的data.exercise 因为state/data里的数据是纯的 不能直接修改 只能通过setData 也是react的思想之一 只能拷贝再使用 浅拷贝和深拷贝雨晨总结一下 我忘了这是那种拷贝了xiaoku
    // for (let i = 0; i < this.data.exercise.length; i++) {    // 这里arr1 其实可以不用传递 直接用this.data.exercise 但是传了 就好好写好mergeObj函数
    for (let i = 0; i < arr1.length; i++) { 
      // let obj1 = arr1[i]
      // let obj2 = arr2[i]
      // let obj3 = { ...obj1, ...obj2 }
      // result.push(obj3)
      copyOrigin[i].judge = arr2[i]
    }
    // return result
    return copyOrigin
  },

  findwrongexercise: function () {
    // for (let i = 0; i < exerciseList.length; i++) {
    //   if (!exerciseList[i].judge) {
    //     this.data.wrong_exercise.push(exerciseList[i])
    //   }
    // }
    
    const exerciseCopy = [...this.data.exercise];
    const user_inputCopy = [...this.data.user_input]; //es6 拷贝数组

    exerciseCopy.forEach((e, index)=>{
      if(e.judge.judge === false) {      // 错误的题
        e.user_input = user_inputCopy[index]         // 给错误的题添加上用户的输入 来展示给错误的列表
      }
    })
    const result = exerciseCopy.filter(e=>{return e.judge.judge === false})
    this.setData({
      wrong_exercise: result
    })
  },

  getDate(){
    var date = new Date();
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds(); 
    console.log(Y+M+D+h+m+s);
    return Y+M+D+h+m+s
  },

  clickToReport() {
    const that = this
    wx.showModal({
      title: '提交报告',
      content: '确定提交做题查看报告？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.judgeAnswer()
          that.findwrongexercise()
          that.setData({
            correct: 6 - that.data.wrong_exercise.length
          })

          wx.cloud.callFunction({   //保存练习报告的数据
            name: 'exerciseFunctions',
            config: {
              env: 'lemon-7glhwqyu5304e1f9'
            },
            data: {
              type: "createExerciseRecord",
              body: {
                "user_id": userStore.getUserData()._id,
                "exercise": that.data.exercise,
                "user_input": that.data.user_input,
                "section": that.data.section,
                "chapter": that.data.chapter,
                "subject": that.data.subject,
                "grade": that.data.grade,
                "wrong_exercise": that.data.wrong_exercise,
                "correct": that.data.correct,
                "data": that.getDate()
              }
            }
          }).then((resp) => {
            console.log(resp)
          }).catch((e) => {
            console.log(e);
          });


          console.log(that.data, 'westore存储的数据')

          exerciseStore.init(that.data.title,that.data.exercise, that.data.user_input, that.data.wrong_exercise, that.data.correct, that.data.section)
          wx.redirectTo({
            url: '/pages/exercise/exercise_report/index',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  onClickPopDot(event) {
    this.setData({
      current: event.currentTarget.dataset.inputindex,
      show: false
    })
  },

  onClickChoice(event) {
    let prevUserInput = this.data.user_input
    prevUserInput[this.data.current] = event.currentTarget.dataset.choiceindex
    this.setData({
      user_input: prevUserInput
    }, () => {
      console.log(this.data.user_input)
    })
  },

  onInput(event) {
    // 保险一点onChange 优化可以blur啥的 
    let prevUserInput = this.data.user_input
    prevUserInput[this.data.current] = event.detail + ''
    this.setData({
      user_input: prevUserInput
    }, () => {
      console.log(this.data.user_input)
    })


    // 检查所有题目是否都做完  是的话关闭enableAlertBeforeUnload  ❌ 到报告页面返回的时候来disable
    // https://www.jianshu.com/p/b2d912920a6a
    // if(this.data.user_input.every(e=> e !== '')) {    // 效率更好的写法？
    //   console.log('所有题目做完')
    //   wx.disableAlertBeforeUnload()
    // }
  }

})