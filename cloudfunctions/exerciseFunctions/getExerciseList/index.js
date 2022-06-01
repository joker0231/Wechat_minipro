const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('exercise')
    .aggregate()
    .match({
      subject: event.subject,
      section: event.section,
      grade: event.grade
    })
    .sample({
      size: 6
    })
    .end()
  } catch(e) {
    console.error(e)
    return {
      error: e
    }
  }
};
