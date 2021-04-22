const webpack = require("webpack")
const config = require("../webpack.xj.js")
const compiler = webpack(config)
Object.keys(compiler.hooks).forEach((hookName) => {
  compiler.hooks[hookName].tap('xxx', () => {
    console.log(`run=====> ${hookName}`)
  })
})

compiler.run()