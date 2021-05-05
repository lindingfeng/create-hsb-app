const chalk = require('chalk');
const request = require('request')
const { getData } = require('./store')
const config = require('../config');

/*
 * @Description: prod、move发版系统请求
 * @MethodAuthor:  lindingfeng
 * @Date: 2021-05-04 14:59:03
*/
const commonRequest = ({
  reqVersion = '3.0.0',
  host,
  url,
  data = {},
  method = 'post',
}) => {
  return new Promise((resolve, reject) => {
    const { login_token, user_id } = getData('loginInfo') || {}
    if (!login_token || !user_id) {
      console.log(chalk.red('未登录'))
      return
    }
    request[method](`${host || config.DEVOPS_MOVE_HOST}${url}`, {
      body: {
        _head: {
          _version: reqVersion,
          _msgType: config.MSG_TYPE,
          _remark: config.REMARK,
          _timestamps: config.TIMESTAMPS
        },
        _param: {
          ...data,
          token: login_token,
          uid: user_id
        }
      },
      json: true
    }, (err, res, data) => {
      if (err) {
        return reject(err)
      }
      if (data && data._data && +data._data._errCode === 0) {
        resolve(data._data.retData)
      } else {
        reject(((data || {})._data || {})._errStr)
      }
    })
  })
}

/*
 * @Description: 应用信息后台系统请求
 * @MethodAuthor:  lindingfeng
 * @Date: 2021-05-04 14:59:03
*/
const jkCommonRequest = ({
  url,
  data = {},
  method = 'post'
}) => {
  const { token = '' } = getData('jkDevopsInfo') || {}
  return new Promise((resolve, reject) => {
    request[method](`${config.JK_HOST}${url}?token=${token}`, {
      body: {
        ...data
      },
      json: true
    }, (err, res, data) => {
      if (err) {
        return reject(err)
      }
      if (+data.code === 0) {
        resolve(data.data)
      } else {
        reject(data.msg)
      }
    })
  })
}

/*
 * @Description: 通过秘钥获取应用信息
 * @MethodAuthor:  lindingfeng
 * @Date: 2021-05-04 15:01:33
*/
const getAppInfoByKey = (key) => jkCommonRequest({
  url: 'getAppListByKey',
  method: 'get',
  data: {
    app_key: key
  }
})

/*
 * @Description: 应用配置后台登录
 * @MethodAuthor:  lindingfeng
 * @Date: 2021-05-04 16:52:00
*/
const devopsConfigLogin = ({ phone, password }) => jkCommonRequest({
  url: 'login',
  data: { phone, password}
})

/*
 * @Description: 创建应用信息
 * @MethodAuthor:  lindingfeng
 * @Date: 2021-05-04 17:16:00
*/
const createAppConfig = (parmas = {}) => jkCommonRequest({
  url: 'createApp',
  data: parmas
})

/*
 * @Description: 获取用户信息
 * @MethodAuthor:  lindingfeng
 * @Date: 2020-10-03 17:16:06
 */
const getUserInfo = () => commonRequest({ url: 'gateway/get_user_info' })

/*
 * @Description: 搜索指定应用
 * @Author: lindingfeng
 * @Date: 2020-10-13 14:23:03
*/
const getAppInfoByKeyword = (app_name) => commonRequest({
  url: 'gateway/get_app_name_list',
  data: {
    app_name
  }
})

module.exports = {
  commonRequest,
  getUserInfo,
  getAppInfoByKeyword,
  getAppInfoByKey,
  devopsConfigLogin,
  createAppConfig
}