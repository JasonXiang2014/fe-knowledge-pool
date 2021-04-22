const fs = require('fs')
const path = require('path')



class filesWebpackPlugin {
  constructor(options) {
    console.log(options)
    let results = {
      fileNumber: 0,
      files: [],
      size: 0
    }
    this.results = results
  }
  //如何钩入hooks
  apply(compiler) {
    //异步钩子
    let results = this.results
    compiler.hooks.emit.tapAsync("filesWebpackPlugin", (compilation, cb) => {

      results.fileNumber = Object.keys(compilation.assets).length
      Object.keys(compilation.assets).map(fileName => {
        let file = {}
        file.name = fileName
        file.size = compilation.assets[fileName].size()
        results.size += file.size
        results.files.push(file)
      })
      compilation.assets["files.json"] = {
        source: function () {
          return JSON.stringify(results)
        },
        size: function () {
          return results.size
        }
      }

      cb()
    })

    compiler.hooks.compile.tap("filesWebpackPlugin", (compilation) => {
      console.log('hello sync hooks')
    })

    compiler.hooks.done.tap("filesWebpackPlugin", (compilation) => {
      const targetPath = path.join(__dirname, "../dist/filesWrite.json")
      console.log(targetPath)
      fs.writeFile(targetPath, JSON.stringify(results), (error) => {
        console.log(`文档写入 ${error ? '失败' : '成功'}`)
      })
    })
  }
}

module.exports = filesWebpackPlugin