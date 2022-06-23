const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    // 创建集合
    await db.collection('record_topic').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        user_id: event.userId,
        post_info: event.post_info,
        topic_id: event.topic_id,
      },
      success: function(res) {
        console.log(res)
      }
    });
    return {
      success: true
    };
  } catch (e) {
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    return {
      success: false,
      error: e
    };
  }
};
