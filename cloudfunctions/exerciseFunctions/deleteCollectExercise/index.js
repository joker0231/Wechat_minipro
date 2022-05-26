const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('collect_exercise').where({
      userId: wxContext.OPENID,
      _id: event.exerciseId
    }).remove()
  } catch(e) {
    console.error(e)
    return {
      error: e
    }
  }
};