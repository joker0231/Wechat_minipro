const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    let resp =  await db.collection('user').where({
      account: event.account,
      password: event.password
    }).get()   // 成功必定返回一个 有些逻辑和雨晨当面说
    if(resp.data.length === 0) {
      return {
        errMsg: "账号或密码错误！",
      }
    } else {
      return resp // 登录成功则返回具体信息 存储在前端store里
    }

  } catch(e) {
    console.error(e)
    return {
      info: '查询出错！', // 多种情况 可能也没注册 细化雨晨可以看
      error: e
    }
  }
};
