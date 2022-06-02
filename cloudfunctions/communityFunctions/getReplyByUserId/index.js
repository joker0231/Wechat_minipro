const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  exports.main = async (event, context) => {
    // 返回数据库查询结果
    // 主信息
    let reply_fetch = await db.collection('mine_topicReply').where({
      target_user_id: event.userId
    }).get();

    let reply_data = reply_fetch.data

    let result = []

    for(let ele of reply_data) {
      const {comment_user_id, target_topic_id, target_user_id} = ele
      let comment_user_fetch = await  db.collection('user').where({
        _id: comment_user_id
      }).get()

      let target_user_fetch = await db.collection('user').where({
        _id: target_user_id
      }).get()

      let topic_fetch = await db.collection('community_topic').where({
        _id: target_topic_id
      }).get();

      let comment_user_data = comment_user_fetch.data[0]
      let target_user_data = target_user_fetch.data[0]
      let topic_data = topic_fetch.data[0]

      let copy = Object.assign({}, ele)

      copy.comment_user = comment_user_data
      copy.target_user = target_user_data
      copy.target_topic = topic_data

      delete copy.comment_user_id
      delete copy.target_user_id
      delete copy.target_topic_id

      result.push(copy)
    }

   
    return result
  };
};
