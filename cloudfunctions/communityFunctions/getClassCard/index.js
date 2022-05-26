const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  exports.main = async (event, context) => {
    // 返回数据库查询结果
    let topic_fetch = await db.collection('community_topic').where({
      type: {$in : ['class', 'exercise']},
    }).get();


    let topic_data = topic_fetch.data
    let user_ids = topic_data.map(e=>e.user_id)

    let user_fetch = await db.collection('user').where({
      _id: {$in: user_ids}
    }).get()
    let user_data = user_fetch.data

    for (let ele of topic_data) {  // 修改user
      ele.user = user_data.filter(e => e._id === ele.user_id)[0]
      delete ele.user_id
    }
    return topic_data
  };
};
