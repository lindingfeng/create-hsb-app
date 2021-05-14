const request = require('request')
const { setData } = require('./store')
const { getUserInfo, devopsConfigLogin } = require('./http');
const config = require('../config');

/*
 * @Description: 发版系统用户信息
 * @MethodAuthor:  lindingfeng
 * @Date: 2021-05-04 15:04:56
*/
const setUserInfo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!config.USER.USERNAME || !config.USER.PASSWORD) {
        throw new Error('缺少登录所需信息')
      }
      const loginInfo = await loginByAMC()
      setData('loginInfo', loginInfo)
      const userInfo = await getUserInfo(loginInfo)
      setData('userInfo', userInfo)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

/*
 * @Description: AMC登录
 * @MethodAuthor:  lindingfeng
 * @Date: 2020-10-03 15:32:13
*/
const loginByAMC = () => {
  const loginForm = {
    username: config.USER.USERNAME,
    password: config.USER.PASSWORD,
    system_id: config.USER.SYSTEM_ID || '44'
  }
  return new Promise((resolve, reject) => {
    request.post(config.AMC_LOGIN_HOST, {
      form: loginForm,
      useQuerystring: true,
      json: true,
      headers: {
        Host: config.AMC_API_HOST
      }
    }, (err, res, data) => {
      if (err) {
        return reject(err)
      }
      if (!data || !data.body || !data.body.data) {
        return reject('登录失败！')
      }
      const body = data.body
      if (+body.ret !== 0) {
        return reject(body.retinfo)
      }
      resolve(body.data)
    })
  })
}

/*
 * @Description: 应用配置后台登录
 * @MethodAuthor:  lindingfeng
 * @Date: 2021-05-04 16:58:09
*/
const loginByAppConfig = async () => {
  return new Promise((resolve, reject) => {
    devopsConfigLogin({
      phone: config.APP_CONFIG_ADMIN.USERNAME,
      password: config.APP_CONFIG_ADMIN.PASSWORD
    }).then(res => {
      if (res.token) {
        setData('jkDevopsInfo', { token: res.token })
        resolve()
      } else {
        reject('应用配置后台登录失败')
      }
    }).catch(err => reject(err))
  })
}

module.exports = {
  setUserInfo,
  loginByAMC,
  loginByAppConfig
}