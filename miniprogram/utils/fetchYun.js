// 封装处理wx.cloudFunction函数

const nullSolve = ()=>{
  wx.showToast({
    title: '网络错误请重试！',
    icon: 'error'
  })
}

const naughtyYun = (func)=>{
  func(nullSolve)
}



// wx.cloud.callFunction({
//   name: 'communityFunctions',
//   config: {
//     env: 'lemon-7glhwqyu5304e1f9'
//   },
//   data: {
//     type: "getCommonCard"
//   }
// }).then((resp) => {
//   console.log(resp, '结果')
//   if(resp) {     // 如果返回结果不为null
//     this.setData({
//       commonCard: resp.result
//     })
//   } else {
//     nullSolve()
//   }
// }).catch((e) => {
//   console.log(e);
// });

const asyncFetchDataPromise = (functionName, functionParam) => {
  return new Promise((resolve, reject)=>{
    wx.cloud.callFunction({
      name: functionName,
      config: {
        env: 'lemon-7glhwqyu5304e1f9'
      },
      data: functionParam
    }).then(resp=>{
      resolve(resp)
    }).catch(err=>{
      reject(err)
    })
  })
}

const fetchYun = async (functionName, functionParam) => {
  //这里封装一层 只是单纯的调用wx.callFunction 结果肯定有好有坏 我们把结果判断一遍 再返回出去 给外面setData啥的
  try {
    const originData = await asyncFetchDataPromise(functionName, functionParam) 
    if(originData.result) {     // 返回结果不为null
      return originData
    } else {     // 返回结果为null
      wx.showToast({
        title: '网络错误请重试！',
        icon: 'error'
      })
    }
  } catch (err) {     // 普通错误 比如网络断开 或者服务器错误等等问题 403 404 203啥的雨晨可以好好学学
    wx.showToast({
      title: '请求失败：' + JSON.stringify(err),
      icon: 'error'
    })
  }
}

export default fetchYun