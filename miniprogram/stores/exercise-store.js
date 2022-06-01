import Exercise from '../model/exercise'
const { Store } = require('../miniprogram_npm/westore/index')   

class ExerciseStore extends Store {
  constructor() {
    super()
    this.exerciseListData = {}
    this.userAnswerData =[]
    this.wrongExerciseList = []
    this.correct = 0
    this.section = ''
    this.exercise = new Exercise()
  }

  init(exerciseListData,userAnswerData,wrongExerciseList,correct,section) {
    this.exercise.setExerciseListData(exerciseListData)
    this.exerciseListData = this.exercise.getExerciseListData()
    this.exercise.setUserAnswerData(userAnswerData)
    this.userAnswerData = this.exercise.getUserAnswerData()
    this.exercise.setWrongExerciseListData(wrongExerciseList)
    this.wrongExerciseList = this.exercise.getWrongExerciseListData()
    this.exercise.setCorrectData(correct)
    this.correct = this.exercise.getCorrectData()
    this.exercise.setSectionData(section)
    this.section = this.exercise.getSectionData()
  }

  getExerciseListData() {
    return this.exerciseListData;
  }

  getUserAnswerData() {
    return this.userAnswerData;
  }

  getWrongExerciseListData() {
    return this.wrongExerciseList;
  }

  getCorrectData() {
    return this.correct;
  }

  getSectionData() {
    return this.section;
  }
}


module.exports = new ExerciseStore