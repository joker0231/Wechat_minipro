const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    let resp =  await db.collection('user').where({
      account: event.account,
    }).get()   // 成功必定返回一个 有些逻辑和雨晨当面说


    // 其实有两种实现逻辑，和loginUser一样的
    // 第一种 后端单纯根据条件查 返回结果 没查到就是length0 查到就是1
    // 然后前端根据length判断是否错误（前端操作性变多了 而且冗余）
    // 第二种就是在后端判断length，注意成功和错误两种的一致性(errMsg字段)
    // 然后前端只做简单的errMsg展示，api看做“纯”的
    // 这两种需要判断有用的逻辑 而readUserAll/readUserKind/readUserId 不用看逻辑 把结果给前端处理就行
    if(resp.data.length === 0) {
      return {
        errMsg: "该注册名可以使用！",
        success: true
      }
    } else {
      // return resp
      return {
        errMsg: "该注册名已经被占用！",
        success: false
      }
    }

  } catch(e) {
    console.error(e)
    return {
      info: '查询出错！', // 多种情况 可能也没注册 细化雨晨可以看
      error: e
    }
  }
};
