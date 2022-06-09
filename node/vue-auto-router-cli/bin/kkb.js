#!/usr/bin/env node
//指定用node去执行shell程序
console.log('cli ...')
//定制命令行界面
const program = require('commander')
program.version(require('../package.json').version)
program.command('init <name>')
  .description('init project')
  .action(require('../lib/init'))
//解析当前进程 命令行后面所带的参数
program.parse(process.argv)