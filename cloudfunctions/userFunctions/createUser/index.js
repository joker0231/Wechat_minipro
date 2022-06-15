const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    // 创建集合
    let newUser = await db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: event.body
    });

    var date = new Date();
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds(); 

    console.log(newUser)
    let newUserId = newUser._id

    let checkInTemplate = {
      history_checkIn: [],
      isTodayIn: false,
      todayDate: Y+M+D,
      user_id: newUserId
    }
    await db.collection('mine_checkIn').add({
      data: checkInTemplate
    });

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
