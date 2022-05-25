const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// adminApi2
// 手机调用
// 入参：webID+用户账号密码混合信息，
// 出参：出参为webId+userId，之后用于api3确定。
// 数据库操作逻辑：先用账号密码查询admin用户
// （还要查kind为管理员 但普通用户用不到该页面，错误失败），
// 然后存储webId，status设置成pending，达到手机和浏览器的一一绑定，返回webId+userId等待确定

exports.main = async (event, context) => {
  // event.webidWithAdminInfo 
  // e.g: 27.17.220.249#1650013888307#a750q#ekko306#123456
  try {
    // 创建集合
    let array = event.webidWithAdminInfo.split('#')
    let resp = await db.collection('user').where({
      account: array[3],
      password: array[4],
      kind: 'admin'
    }).get()
    if(resp.data.length !== 0 ) { // 校验成功
      let updateBody = {
        ...resp.data[0],
        admin_webId: event.webidWithAdminInfo,
        admin_status: 'pending'
      }
      delete updateBody._id
      await db.collection('user').doc(resp.data[0]._id).update({
        data: updateBody
      }).then((res)=>{
        // 成功更新
        console.log('123')
      })
      let result = event.webidWithAdminInfo + '#' + resp.data[0]._id  // 直接把真的webid返回
      return result

    } else {
      return {
        errMsg: '校验失败！！！！'   // 之后前端调用Api5 清空这次鉴权
      }
    }
  } catch (e) {
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    console.log(e)
    return {
      success: false,
      error: e
    };
  }
};
