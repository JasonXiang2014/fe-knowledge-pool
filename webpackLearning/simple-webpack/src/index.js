//分析入口模块的内容
//依赖模块（目的是模块的路径）
//借助babel 处理模块 生成代码片段
import { str } from "./a.js"
import { str2 } from "./b.js"

console.log(`hello ${str} and ${str2}`)