const createClass = require('./createClass/index');
const createClassRecord = require('./createClassRecord/index');
const deleteClass = require('./deleteClass/index');
const getClassAll = require('./getClassAll/index');
const getClassByGrade = require('./getClassByGrade/index');
const createClassVideo = require('./createClassVideo/index');
const createCollectClass = require('./createCollectClass/index');
const createExpandclass = require('./createExpandclass/index');
const deleteCollectClass = require('./deleteCollectClass/index');
const deleteExpandclass = require('./deleteExpandclass/index');
const getClassPostById = require('./getClassPostById/index');
const getClassById = require('./getClassById/index');
const getClassVideoById = require('./getClassVideoById/index');
const getExpandclassByGrade = require('./getExpandclassByGrade/index');
const getGameAll = require('./getGameAll/index');
const updateGame = require('./updateGame/index');

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  switch (event.type) {
    case 'createClass':
      return await createClass.main(event, context);
    case 'deleteClass':
      return await deleteClass.main(event, context);
    case 'getClassAll':
      return await getClassAll.main(event, context);
    case 'getClassByGrade':
      return await getClassByGrade.main(event, context);
    case 'createClassRecord':
      return await createClassRecord.main(event, context);
    case 'createClassVideo':
      return await createClassVideo.main(event, context);
    case 'createCollectClasss':
      return await createCollectClass.main(event, context);
    case 'createExpandclass':
      return await createExpandclass.main(event, context);
    case 'deleteCollectClass':
      return await deleteCollectClass.main(event, context);
    case 'deleteExpandclass':
      return await deleteExpandclass.main(event, context);
    case 'getClassById':
      return await getClassById.main(event, context);
    case 'getClassPostById':
      return await getClassPostById.main(event, context);
    case 'getClassVideoById':
      return await getClassVideoById.main(event, context);
    case 'getExpandclassByGrade':
      return await getExpandclassByGrade.main(event, context);
    case 'getGameAll':
      return await getGameAll.main(event, context);
    case 'updateGame':
      return await updateGame.main(event, context);
  }
};
