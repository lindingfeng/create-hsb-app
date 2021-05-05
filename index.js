const fs = require('fs');
const child_process = require("child_process");
const chalk = require('chalk')
const { setData } = require('./lib/store')
const { createAppConfig } = require('./lib/http')
const { setUserInfo, loginByAppConfig } = require('./lib/user')
const { inquirerHandle, getNewAppApplyInfo, createAppConfigParmas } = require('./lib/utils');
const dowmloadTemplate = require('./lib/download');
const { checkApp } = require('./lib/devops')
const config = require('./config');

/*
 * @Description: 模板选择
 * @MethodAuthor:  lindingfeng
 * @Date: 2021-05-03 17:47:02
*/
const getHsbAppTemplate = () => {
  inquirerHandle([
    {
      name: 'projectName',
      message: '请输入项目名称',
      type: 'input',
      validate: (res) => !!res
    },
    {
      name: 'projectDesc',
      message: '请输入项目简介',
      type: 'input',
      validate: (res) => !!res
    },
    {
      name: 'projectType',
      message: '请选择模板类型',
      type: 'list',
      choices: config.TEMPLATE_LIST
    },
  ], async (answer) => {
    const err = await dowmloadTemplate({
      projectName: answer.projectName,
      projectType: answer.projectType
    })
    if (err) {
      console.log(chalk.red(error))
    } else {
      console.log(chalk.green('✨ 项目创建成功'))
      createDevopsAppInfo(answer)
    }
  })
}

/*
 * @Description: 创建发版应用
 * @MethodAuthor:  lindingfeng
 * @Date: 2021-05-03 19:39:11
*/
const createDevopsAppInfo = (beseInfo = {}) => {
  inquirerHandle([
    {
      name: 'devopsNeed',
      message: '需要帮你创建发版应用信息吗',
      type: 'list',
      choices: config.CREATE_DEVOPS_LIST
    },
    {
      name: 'devopsName',
      message: '请输入应用名',
      type: 'input',
      validate: (res) => !!res,
      when: ({ devopsNeed }) => devopsNeed === 1
    }
  ], async (answer) => {
    const { devopsName } = answer
    try {
      if (devopsName) {
        // 登录AMC并写入用户信息
        await setUserInfo()
        const token = await loginByAppConfig()
        if (!token) throw new Error('应用配置后台登录失败')
        setData('jkDevopsInfo', { token })
        const { app_key: appKey = '' } = await createAppConfig(createAppConfigParmas(devopsName))
        console.log(chalk.green('✨ 应用信息配置成功'))
        // 更新package.json、hsb.devops.json文件
        await updateConfigFiles({ ...beseInfo, devopsName, appKey })
        // 查询应用配置后台是否有该应用信息
        const isExist = await checkApp(devopsName)
        if (isExist) {
          console.log(chalk.yellow(`应用：${devopsName} 已存在`))
        } else {
          console.log(chalk.yellow(getNewAppApplyInfo(devopsName)))
          openDevopsAdmin()
        }
      }
    } catch (error) {
      console.log(chalk.red(error))
    }
  })
}

/*
 * @Description: update config files
 * @MethodAuthor:  lindingfeng
 * @Date: 2021-05-04 16:07:39
*/
const updateConfigFiles = (beseInfo = {}) => {
  const oldPackage = fs.readFileSync(`${process.cwd()}/${beseInfo.projectName}/package.json`, { encoding: 'utf-8' })
  const oldPackageJson = JSON.parse(oldPackage)
  const parmas = {
    name: beseInfo.projectName,
    description: beseInfo.projectDesc,
    projectType: beseInfo.projectType,
    author: config.USER.USERNAME || '',
    deployName: beseInfo.devopsName,
    scripts: {
      ...oldPackageJson.scripts,
      devops: "hsb-devops-move init"
    }
  }
  beseInfo.appKey && (parmas.scripts['devops-key'] = `hsb-devops-move init -k ${beseInfo.appKey}`)
  const newPackage = Object.assign({}, oldPackageJson, parmas)
  fs.writeFileSync(`${process.cwd()}/${beseInfo.projectName}/package.json`, JSON.stringify(newPackage, null, 2), { encoding: 'utf-8' })
  fs.writeFileSync(`${process.cwd()}/${beseInfo.projectName}/hsb.devops.json`, JSON.stringify(config.BASE_DEVOPS_ORDER_INFO, null, 2), { encoding: 'utf-8' })
}

/*
 * @Description: 前往运维开发管理后台申请应用
 * @MethodAuthor:  lindingfeng
 * @Date: 2021-05-04 15:22:17
*/
const openDevopsAdmin = () => {
  inquirerHandle([
    {
      name: 'link',
      message: '运维开发管理后台',
      type: 'list',
      choices: config.DEVOPS_ADMIN_LIST
    }
  ], async (answer) => {
    if (answer.link === 1) {
      let cmd = ''
      switch (process.platform) {
        case 'darwin':
          cmd = 'open'
          break;
        case 'win32':
          cmd = 'start'
          break;
        default:
          cmd = 'xdg-open'
          break;
      }
      return child_process.exec(`${cmd} ${config.DEVOPS_ADMIN}`)
    }
    console.log(chalk.green(config.DEVOPS_ADMIN))
  })
}

const run = (user, password) => {
  getHsbAppTemplate()
}

module.exports = { run }