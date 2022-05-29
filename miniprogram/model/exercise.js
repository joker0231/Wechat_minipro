class User {
  constructor() {
    this.userData = {}
  }

  setUserData(inData) {
    this.userData = inData
  }

  getUserData() {
    return this.userData
  }
}


module.exports = User