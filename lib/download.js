const fs = require('fs')
const ora = require('ora');
const rm = require('rimraf')
const download = require('download-git-repo')
const { HSB_TEMPLATE_GIT } = require('../config')

const dir = process.cwd()

/*
 * @Description: 拉取模板文件
 * @MethodAuthor:  lindingfeng
 * @Date: 2021-05-03 17:26:00
*/
const dowmloadTemplate = ({ projectName, projectType }) => {
  return new Promise((resolve) => {
    const path = `${dir}/${projectName}`
    // 已存在同名文件夹，先删除
    if (fs.existsSync(path)) {
      rm.sync(path)
    }
    const spinner = ora('正在拉取模板, 请稍后...');
    spinner.start()
    download(`direct:${HSB_TEMPLATE_GIT}#${projectType}`, path, { clone: true }, error => {
      spinner.stop()
      if (error) {
        return resolve(error)
      }
      resolve()
    })
  })
}

module.exports = dowmloadTemplate