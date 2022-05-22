const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// adminApi5
// 兜底，所有错误或浏览器端退出登录则消除扫码登录状态，status设置成reject,webId设置为null

exports.main = async (event, context) => {
  // event.adminId
  try {
    
    let resp1 = await db.collection('user').doc(event.adminId).get()

    let copy = {...resp1.data};
    delete copy._id;

    let resp2 = await db.collection('user').doc(event.adminId).update({
      data: {
        ...copy,
        admin_webId: "null",
        admin_status: "reject"    // 或者null
      }
    })

    let resp3 = await db.collection('user').doc(event.adminId).get() //查询更新后的结果返回

    // TODO: 报错情况处理 先暂时确定查询到 或者雨晨试试 查询到/没查到/更新成功/失败
    return resp3
  } catch (e) {

    return {
      error: e,
    };
  }
};
