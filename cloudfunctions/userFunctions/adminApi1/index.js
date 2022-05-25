const cloud = require('wx-server-sdk');

cloud.init({
  env: 'lemon-7glhwqyu5304e1f9'
});

const db = cloud.database();

// adminApi1
// web调用
// 入参：浏览器信息(可结合时间戳唯一性形成唯一webId)。
// 出参：二维码需要的的字符串信息。
// 不操作数据库，加上服务端随机数（二维码id）后作为webId直接返回，加上随机数保证服务端的鉴别性



function makeid(length) { // 二维码随机id
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 return result;
}

exports.main = async (event, context) => {
  let random = makeid(5) // 5为二维码id
  let resp = event.webId + '#' + random
  console.log(resp)
  return resp
};
