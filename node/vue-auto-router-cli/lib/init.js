const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))
const { clone } = require('../lib/download')

module.exports = async name => {
  //打印欢迎界面
  clear()
  const data = await figlet('KKB Welcome')
  log(data)

  console.log(`🚀 开始下载 ${name}`)
  await clone('github:su37josephxia/vue-template', name)

  //安装依赖
  //一般在子进程进行安装，但是子进程没有输出日志
}
