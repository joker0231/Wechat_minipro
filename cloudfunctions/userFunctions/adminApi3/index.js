const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// adminApi3
// 手机调用
// 入参webID+用户id
// 出参succes
// 数据库操作逻辑：用webID和用户id一一对应查询成功，设置status: online"

exports.main = async (event, context) => {
  // event.webidWithAdminId
  try {
    // 创建集合
    let array = event.webidWithAdminId.result.split("#")
    let copy = array.slice()
    copy.pop()
    let preWebId =  copy.join("#")
    let resp = await db.collection('user').where({
      // data 字段表示需新增的 JSON 数据
      _id: array[5],
      admin_webId: preWebId
    }).get(); // 筛选成功

    if(resp.data.length !== 0 ) {
      let updateBody = {
        ...resp.data[0],
        admin_status: 'resolve'
      }
      delete updateBody._id

      await db.collection('user').doc(resp.data[0]._id).update({
        data: updateBody
      }).then((res)=>{
        // 成功更新
        console.log('123')
      })
      
      return {msgErr: '成功登录！！', webId: event.webidWithAdminId.result}
    }

    return {
      success: true
    };
  } catch (e) {
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    console.log(e)
    return {
      success: false,
      error: e
    };
  }
};
