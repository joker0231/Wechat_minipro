const createNewCheckIn = require('./createNewCheckIn')
const updateCheckIn = require('./updateCheckIn')
const getCheckInDay = require('./getCheckInDay')
const createNewProgress = require('./createNewProgress')
const updateProgress = require('./updateProgress')
const getProgress = require('./getProgress')
const getUserCollectByType = require('./getUserCollectByType')
const getUserRecordByType = require('./getUserRecordByType')
const getUserSpaceData = require('./getUserSpaceData')
const createNewSpace = require('./createNewSpace')
const updateSpace = require('./updateSpace')
const getUserTopicReply = require('./getUserTopicReply')
const getUserTopic = require('./getUserTopic')

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  switch (event.type) {
    case 'createNewCheckIn': 
      return await createNewCheckIn.main(event, context)
    case 'updateCheckIn':
      return await updateCheckIn.main(event, context)
    case 'getCheckInDay':
      return await getCheckInDay.main(event, context)
    case 'createNewProgress': 
      return await createNewProgress.main(event, context)
    case 'updateProgress':
      return await updateProgress.main(event, context)
    case 'getProgress':
      return await getProgress.main(event, context)
    case 'getUserCollectByType':
      return await getUserCollectByType.main(event, context)
    case 'getUserRecordByType':
      return await getUserRecordByType.main(event, context)
    case 'getUserSpaceData':
      return await getUserSpaceData.main(event, context)
    case 'createNewSpace':
      return await createNewSpace.main(event, context)
    case 'updateSpace':
      return await updateSpace.main(event, context)
    case 'getUserTopicReply':
      return await getUserTopicReply.main(event, context)
    case 'getUserTopic':
      return await getUserTopic.main(event, context)
  }
};
