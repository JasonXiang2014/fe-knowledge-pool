class txtWebpackPlugin {
  constructor(options) {
    console.log(options)
  }
  //如何钩入hooks
  apply(compiler) {
    //异步钩子
    compiler.hooks.emit.tapAsync("txtWebpackPlugin", (compilation, cb) => {
      compilation.assets["test.txt"] = {
        source: function () {
          return "hello myplugins"
        },
        size: function () {
          return 1024
        }
      }
      cb()
    })

    compiler.hooks.compile.tap("txtWebpackPlugin", (compilation) => {
      console.log('hello sync hooks')
    })
  }
}

module.exports = txtWebpackPlugin