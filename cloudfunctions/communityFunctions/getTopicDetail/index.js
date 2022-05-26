const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  exports.main = async (event, context) => {
    // 返回数据库查询结果
    console.log(event)
    let id = event.postId

    // 主信息
    let topic_fetch = await db.collection('community_topic').where({
      _id: id
    }).get();

    let topic_data = topic_fetch.data[0]

    // 一级评论 我去 用户信息也要查询替换掉id信息范围
    let comment_main_fetch = await db.collection('community_comment_main').where({
      community_topic_id: topic_data._id
    }).get()
    let comment_main_data = comment_main_fetch.data   // 可能是数组 一个topic 多个评论
    let main_ids = comment_main_data.map(e=>e._id)
    let main_userIds = comment_main_data.map(e=>e.user_id)



    // 二级评论 （搜索二级评论 还要根据一级数组来搜索）（用$in操作符）
    let comment_vice_fetch = await db.collection('community_comment_vice').where({
      community_comment_main_id: {$in : main_ids}
    }).get()
    let comment_vice_data = comment_vice_fetch.data   // 可能是数组 一个主评论 多个子评论
    let vice_userIds = comment_vice_data.map(e=>e.user_id)


    

  
    // 统一遍历user_id 弄成map 下面再统一替换操作（先查）
    let all_users = []
    all_users.push(topic_data.user_id, ...main_userIds, ...vice_userIds)
    let user_fetch = await db.collection('user').where({
      _id: {$in: all_users}
    }).get()
    let user_data = user_fetch.data

    ///////////////////////// 上面是获取所有数据    下面就可以处理了

    // 现在获取了根据某个固定topic的id 获取了一级评论 和所有二级评论 子评论是接在主评论上的 好麻烦o(╥﹏╥)o
    //（搜索二级评论 还要根据一级数组来搜索）

    console.log(comment_vice_data)
    let response // 最后返回结果
    response = topic_data // 主体
    
    // 修改主体topic user_id 为user对应内容
    response.user = user_data.filter(e => e._id === response.user_id)[0]
    delete response.user_id

    // 先修改二级评论所有user_id 拼接到comment_main 主体上去 （好多循环 估计效率很低哈哈哈 白屏一段时间 比如下面有n^2时间复杂度的 但对少的评论还行？）
    for (let ele of comment_vice_data) {   // 修改user
      ele.user = user_data.filter(e => e._id === ele.user_id)[0]
      delete ele.user_id
    } 
    for(let ele of comment_vice_data) {   // 遍历拼接 二级拼接到一级上去
      comment_main_data.forEach(e=>{       // forEach原地修改
        if(e._id === ele.community_comment_main_id) {
          // 如果一开始不存在 创建数组存进去 如果存在 push进去
          if('comment_vice' in e === false) {
            e.comment_vice = [ele]
          } else if ('comment_vice' in e) {
            e.comment_vice.push(ele)
          }
        }
      })
    }

    // 再修改一级评论的所有user_id 并拼接到response主体上去
    for (let ele of comment_main_data) {  // 修改user
      ele.user = user_data.filter(e => e._id === ele.user_id)[0]
      delete ele.user_id
    }
    response.comment_main = comment_main_data

    // TODO 主体的link_id 没有替换上去 因为前面的啥课程表还要等雨晨弄好 再替换
    return response
  };
};
