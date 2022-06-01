const createCollectExercise = require('./createCollectExercise/index');
const createExerciseRecord = require('./createExerciseRecord/index');
const deleteCollectExercise = require('./deleteCollectExercise/index');
const deleteExercise = require('./deleteExercise/index');
const getExerciseAll = require('./getExerciseAll/index');
const getExerciseById = require('./getExerciseById/index');
const getExerciseList = require('./getExerciseList/index');
const getExerciseRecord = require('./getExerciseRecord/index');
const getExerciseRecordList = require('./getExerciseRecordList/index');
const updateExercise = require('./updateExercise/index');

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  switch (event.type) {
    case 'createCollectExercise':
      return await createCollectExercise.main(event, context);
    case 'createExerciseRecord':
      return await createExerciseRecord.main(event, context);
    case 'deleteCollectExercise':
      return await deleteCollectExercise.main(event, context);
    case 'deleteExercise':
      return await deleteExercise.main(event, context);
    case 'getExerciseAll':
      return await getExerciseAll.main(event, context);
    case 'getExerciseById':
      return await getExerciseById.main(event, context);
    case 'getExerciseList':
      return await getExerciseList.main(event, context);
    case 'getExerciseRecord':
      return await getExerciseRecord.main(event, context);
    case 'getExerciseRecordList':
      return await getExerciseRecordList.main(event, context);
    case 'updateExercise':
      return await updateExercise.main(event, context);
  }
};
