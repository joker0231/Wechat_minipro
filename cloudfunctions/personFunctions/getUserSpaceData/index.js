const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  exports.main = async (event, context) => {
    // 返回数据库查询结果
    let resp = await db.collection('mine_space').where({
      user_id: event.userId,
    }).get();
    return resp
  };
};