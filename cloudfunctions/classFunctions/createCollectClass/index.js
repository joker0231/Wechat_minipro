const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    // 创建集合
    await db.collection('collect_class').add({
      // data 字段表示需新增的 JSON 数据
      userId: wxContext.OPENID,
      data: event.body,
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
