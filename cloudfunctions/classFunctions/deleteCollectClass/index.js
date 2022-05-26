const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    await db.collection('collect_class').where({
      _id: event._id
    }).remove()
    await db.collection('class').doc(event._id).update({
      // data 字段表示需新增的 JSON 数据
      data: {
        is_collected: false
      },
      success: function(res) {
        console.log(res)
      }
    });
    return {
      success: true
    };
  } catch(e) {
    console.error(e)
    return {
      error: e
    }
  }
};
