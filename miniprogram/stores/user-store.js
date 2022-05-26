import User from '../model/user'
const { Store } = require('../miniprogram_npm/westore/index')   

// 如果有频繁更改user数据 还需要搞一些update()方法 来触发全局别的地方更新 但是这里user数据只是暂时单纯设定一次后 全局读取 没有修改
// 而且他的架构很纯 有的是吧这个store的数据用到页面里 太耦合了
class UserStore extends Store {
  constructor() {
    super()
    this.userData = {}
    this.user = new User()
  }

  init(userData) {
    this.user.setUserData(userData)
    this.userData = this.user.getUserData()
  }

  getUserData() {
    return this.userData;
  }
}


module.exports = new UserStore