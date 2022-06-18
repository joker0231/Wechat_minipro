const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    // 创建集合
    let resp = await db.collection('user').doc(event._id).update({
      data:{
        avatar: event.avatar,
        nickname: event.nickname,
        sex: event.sex,
        $educationInfo: event.educationInfo,
        account: event.account
      }
    })

    // TODO: 报错情况处理 先暂时确定查询到 或者雨晨试试 查询到/没查到/更新成功/失败
    return resp
  } catch (e) {

    return {
      error: e,
    };
  }
};
