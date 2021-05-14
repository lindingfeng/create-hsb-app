const { getAppInfoByKeyword } = require('./http')

/*
 * @Description: 检查应用是否存在
 * @MethodAuthor:  lindingfeng
 * @Date: 2021-05-04 14:52:03
*/
const checkApp = (app_name) => {
  return new Promise((resolve, reject) => {
    getAppInfoByKeyword(app_name).then(data => {
      if (data && data.length) {
        return reject(`应用：${devopsName} 已存在`)
      }
      resolve()
    }).catch(err => reject(err))
  })
}

/*
 * @Description: 申请创建发版应用
 * @MethodAuthor:  lindingfeng
 * @Date: 2021-05-04 14:54:30
*/
const applyCreateApp = () => {}

module.exports = {
  checkApp,
  applyCreateApp
}