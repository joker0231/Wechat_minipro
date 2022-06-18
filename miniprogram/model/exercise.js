class Exercise {
  constructor() {
    this.exerciseListData = {}
    this.userAnswerData = []
    this.wrongExerciseList = []
    this.correct = 0
    this.section = ''
    this.title = ''
  }

  setExerciseListData(inData) {
    this.exerciseListData = inData
  }

  getExerciseListData() {
    return this.exerciseListData
  }

  setUserAnswerData(inData) {
    this.userAnswerData = inData
  }

  getUserAnswerData() {
    return this.userAnswerData
  }

  setWrongExerciseListData(inData) {
    this.wrongExerciseList = inData
  }

  getWrongExerciseListData() {
    return this.wrongExerciseList
  }

  setCorrectData(inData) {
    this.correct = inData
  }

  getCorrectData() {
    return this.correct
  }

  setSectionData(inData) {
    this.section = inData
  }

  getSectionData() {
    return this.section
  }

  setTitleData(inData) {
    this.title = inData
  }

  getTitleData() {
    return this.title
  }
}


module.exports = Exercise