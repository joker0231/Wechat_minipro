const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// adminApi4
// 浏览器调用
// 入参：webID 用Api1版本的 webID + random版本查询 看看where方法 能不能前段匹配 不精确匹配
// 出参：admin_status
// 作为浏览器不断轮询查询状态，若为pending提示手机确认登录，若为offline则为失效唤起重新刷新"

exports.main = async (event, context) => {
  try {
    // 创建集合
    let resp = await db.collection('user').where({
      admin_webId: {$regex : event.originWebId}    // 查询部分 背后是mongodb 支持正则的
    }).get()

    return resp
  } catch (e) {
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    console.log(e)
    return {
      success: false,
      error: e
    };
  }
};
