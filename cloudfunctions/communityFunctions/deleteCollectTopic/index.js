const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('collect_topic').where({
      _id: event.collectId
    }).remove()
  } catch(e) {
    console.error(e)
    return {
      error: e
    }
  }
};