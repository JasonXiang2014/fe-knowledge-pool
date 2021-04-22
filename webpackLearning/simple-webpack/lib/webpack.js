const fs = require("fs")
const path = require("path")
//@babel/parser 可以将代码解析成ast
const parser = require("@babel/parser")
//@babel/traverse 可以对ast做增删改查
const traverse = require("@babel/traverse").default
const { transformFromAst } = require("@babel/core")

module.exports = class Webpack {
  constructor(options) {
    console.log(options)
    this.entry = options.entry
    this.output = options.output
    this.modules = []
  }
  run() {
    const info = this.parse(this.entry)
    this.modules.push(info)
    //递归处理所有依赖
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i]
      const { dependencies } = item
      if (dependencies) {
        for (let j in dependencies) {
          this.modules.push(this.parse(dependencies[j]))
        }
      }
    }
    console.log('xjDebugger:----------modules', this.modules)
    //修改数据结构 数组转对象
    const obj = {}
    this.modules.forEach(item => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code
      }
    })
    console.log('xjDebugger:----------obj', obj)

    //代码生成 文件生成
    this.file(obj)
  }

  parse(entryFile) {
    const content = fs.readFileSync(entryFile, "utf-8")
    const ast = parser.parse(content, { sourceType: "module" })
    // console.log('xjDebugger:ast', ast.program, ast.program.body[0].source)
    // console.log('xjDebugger:source0', ast.program.body[0].source)
    const dependencies = {}
    traverse(ast, {
      ImportDeclaration({ node }) {
        const newPathName = "./" + path.join(path.dirname(entryFile), node.source.value)
        console.log('xjDebugger:-----------node', newPathName)
        dependencies[node.source.value] = newPathName
      }
    })
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"],
    })
    console.log('xjDebugger:----------code', code)
    console.log('xjDebugger:----------dependencies', dependencies)
    return {
      entryFile,
      dependencies,
      code
    }
  }
  file(code) {
    const filePath = path.join(this.output.path, this.output.filename)
    const _code = JSON.stringify(code)
    //生成bundle
    const bundle = `(function(modules){
      function require(module){
        function newRequire(relativePath){
          return require(modules[module].dependencies[relativePath])
        }
        var exports = {};
        (function(require,exports,code){
          eval(code)
        })(newRequire, exports,modules[module].code)
        return exports;
      }
      require('${this.entry}')
    })(${_code})`
    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}