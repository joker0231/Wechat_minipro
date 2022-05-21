const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    await db.collection('exercise')
    .aggregate()
    .match({
      grade: event.grade,
      subject: event.subject,
      section: event.section,
    })
    .sample({
      size: 5
    })
    .end()
    .then(res => {
      console.log('[数据库] [查询记录] 成功: ', res)
      return items = res.list;
    })
  } catch(e) {
    console.error(e)
    return {
      error: e
    }
  }
};
