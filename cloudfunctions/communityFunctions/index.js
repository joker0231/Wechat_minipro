const getCommonCard = require('./getCommonCard')
const getClassCard = require('./getClassCard')
const createNewPost = require('./createNewPost')
const getTopicDetail = require('./getTopicDetail')
const deletePost = require('./deletePost')
const createMainComment = require('./createMainComment')
const createViceComment = require('./createViceComment')
const deleteComment = require('./deleteComment')
const updateTopicLike = require('./updateTopicLike')
const updateCommentLike = require('./updateCommentLike')
const createCollectTopic = require('./createCollectTopic')
const deleteCollectTopic = require('./deleteCollectTopic')
const createTopicReply = require('./createTopicReply')


// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  switch (event.type) {
    case 'getCommonCard': 
      return await getCommonCard.main(event, context)
    case 'getClassCard': 
      return await getClassCard.main(event, context)
    case 'createNewPost':
      return await createNewPost.main(event, context)
    case 'getTopicDetail':
      return await getTopicDetail.main(event, context)
    case 'deletePost':
      return await deletePost.main(event, context)
    case 'createMainComment':
      return await createMainComment.main(event, context)
    case 'createViceComment':
      return await createViceComment.main(event, context)
    case 'deleteComment':
      return await deleteComment.main(event, context)
    case 'updateTopicLike':
      return await updateTopicLike.main(event, context)
    case 'updateCommentLike':
      return await updateCommentLike.main(event, context)
    case 'createCollectTopic':
      return await createCollectTopic.main(event, context)
    case 'deleteCollectTopic':
      return await deleteCollectTopic.main(event, context)
    case 'createTopicReply':
      return await createTopicReply.main(event, context)
  }
};
