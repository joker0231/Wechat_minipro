const createUser = require('./createUser/index');
const deleteUser = require('./deleteUser/index');
const loginUser = require('./loginUser/index');
const readUserAll = require('./readUserAll/index');
const readUserByAccount = require('./readUserByAccount/index');
const readUserById = require('./readUserById/index');
const readUserByKind = require('./readUserByKind/index');
const updateUser = require('./updateUser/index')
const adminApi1 = require('./adminApi1/index')
const adminApi2 = require('./adminApi2/index')
const adminApi3 = require('./adminApi3/index')
const adminApi4 = require('./adminApi4/index')
const adminApi5 = require('./adminApi5/index')


// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  switch (event.type) {
    case 'createUser':
      return await createUser.main(event, context);
    case 'deleteUser':
      return await deleteUser.main(event, context);
    case 'loginUser':
      return await loginUser.main(event, context);
    case 'readUserAll':
      return await readUserAll.main(event, context);
    case 'readUserByAccount':
      return await readUserByAccount.main(event, context);
    case 'readUserById':
      return await readUserById.main(event, context);
    case 'readUserByKind':
      return await readUserByKind.main(event, context);
    case 'updateUser':
      return await updateUser.main(event, context);
    case 'adminApi1':
      return await adminApi1.main(event, context);
    case 'adminApi2':
      return await adminApi2.main(event, context);
    case 'adminApi3':
      return await adminApi3.main(event, context);
    case 'adminApi4':
      return await adminApi4.main(event, context);
    case 'adminApi5':
      return await adminApi5.main(event, context);
  }
};
