const inquirer = require('inquirer');
const config = require('../config');

/*
 * @Description: 创建交互式命令
 * @MethodAuthor:  lindingfeng
 * @Date: 2020-10-03 18:51:05
*/
const inquirerHandle = (questions, callBack, errCallBack) => {
  inquirer.prompt(questions).then(answers => {
    callBack && callBack(answers)
  })
  .catch(error => {
    errCallBack && errCallBack(error)
  });
}

const getNewAppApplyInfo = (appName) => {
  return [
    `\n- 应用名称: ${appName}`,
    `\n- 应用类型: Web`,
    `\n- 所属FT: 自有平台`,
    `\n- 是否监控: 否`,
    `\n- 业务层级: 接入层`,
    `\n- 审核TL: 羊年`,
    `\n- 发版环境: devops-move`,
    `\n- 关联用户、关联测试、关联pre、关联生产: 没有权限`,
    `\n- 应用目录: /data/webroot/${appName}`,
    `\n- 编译目录: /data/webroot/front/${appName}`,
    `\n- 配置目录: /`,
    `\n- git地址: 项目gitlab地址，用于clone的那个地址`,
    `\n- 编译命令: sh pack.sh`,
    `\n- hook命令: 0`,
    `\n- 启动命令: 0`,
    `\n- 重启命令: 0`,
    `\n- 停止命令: 0`,
    `\n- 进程数、服务名称、服务域名、日志模块、钉钉群、端口: 不填`,
    `\n- cdn_bucket: s1`,
    `\n- cdn_region: ap-guangzhou`,
    `\n- cdn_uri: https://s1-1251010403.file.myqcloud.com/`,
    `\n- 应用描述: 自行补充`,
    `\n- service_id: 110000`,
    `\n- call_id: 120000`
  ].join('')
}

/*
 * @Description: 创建应用信息
 * @MethodAuthor:  lindingfeng
 * @Date: 2021-05-04 17:26:46
*/
const createAppConfigParmas = (devopsName, parmas = {}) => {
  return {
    amc_user: config.BASE_DEVOPS_ORDER_INFO.USER.USERNAME,
    amc_pass: config.BASE_DEVOPS_ORDER_INFO.USER.PASSWORD,
    app_name: devopsName,
    app_status: 1,
    app_type: "1",
    build_command: "npm run build",
    cdn_upload_dir: `/${devopsName}/`,
    dingTalk_url: "https://oapi.dingtalk.com/robot/send?access_token=5bcca4f0515f15d981b3818f10473aea9f2693bc933b8471122542ac1bc1352f",
    ft_te: "1845,林定锋",
    ft_tl: `${config.BASE_DEVOPS_ORDER_INFO.ORDER.TL_ID},${config.BASE_DEVOPS_ORDER_INFO.ORDER.TL}`,
    ftid: config.BASE_DEVOPS_ORDER_INFO.ORDER.ftid,
    gray_publish_flag: config.BASE_DEVOPS_ORDER_INFO.ORDER.gray_publish_flag,
    push_cdn_type: config.BASE_DEVOPS_ORDER_INFO.ORDER.push_cdn_type,
    rolling_flag: config.BASE_DEVOPS_ORDER_INFO.ORDER.rolling_flag,
    test_flag: config.BASE_DEVOPS_ORDER_INFO.ORDER.test_flag,
    ...parmas
  }
}

module.exports = {
  inquirerHandle,
  getNewAppApplyInfo,
  createAppConfigParmas
}