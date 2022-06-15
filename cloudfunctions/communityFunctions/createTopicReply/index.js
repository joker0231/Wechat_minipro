const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  // 想一下数据结构
  // _id 自己id
  // target_topic_id 回复的目标id （这里面有帖子原用户信息了）
  // target_user_id 为了方便直接放在这里 不然后端要麻烦
  // comment_user_id 发布消息的用户id
  // content 消息内容
  // date
  // isChecked 是否查看过 只要有一条没查看就小红点 到里面页面 全部设置成查看

  
  try {
    // 创建集合
    await db.collection('mine_topicReply').add({
      data: event.body
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
