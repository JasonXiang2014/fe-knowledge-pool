## Webpack概念

模块打包器

## 1. hbs

模版库

## 2.cjs

[Javascript 中的 CJS, AMD, UMD 和 ESM是什么？](https://juejin.cn/post/6935973925004247077)

- 由于 `ESM` 具有简单的语法，异步特性和可摇树性，因此它是最好的模块化方案
- `UMD` 随处可见，通常在 `ESM` 不起作用的情况下用作备用
- `CJS` 是同步的，适合后端
- `AMD` 是异步的，适合前端

## 3. 安装

### 3.1 环境准备

* nodeJs 升级到最新版本

### 3.2 4.x版本

```
//局部安装方式 推荐
npm install webpack@v4.46.0 webpack-cli -D
//全局方式安装
npm install webpack webpack-cli -g
```

## 4  启动

```
npx webpack
```

或者

```
package.json 
  "scripts": {
    "dev": "webpack"
  },
npm run dev  
```

## 5 配置

* 默认零配置

* 自定义配置 webpack.config.js  

  scripts脚本如果没有指定对应的配置文件，默认走webpack.config.js

  ```
  "dev": "webpack --config ./webpack.xj.js"
  ```

* webpack.base.config.js

* wbepack.dev.config.js wbepack.pro.config.js

## 6 核心概念

* 何为零配置

  升级到4.x时候，支持零配置，零配置默认走./src/index.js下的文件为入口文件，

  不指定mode，同时output.path = path.resolve(__dirname, "./build"),

  output.filename = "main.js"

* 何为配置文件

  默认文件（webpack.config.js） 和自定义配置文件(通过 --config指定)

* entry

  打包入口

  * spa

    单页面入口

  * mpa

    多页面入口

  支持string array object

* output

  打包出口

  * path  输出资源的存放位置，必须是绝对路径

  * filename  资源名称 name就是entry里面的key值 占位符的概念 【name】

  * 【hash:number】【chunkhash】【contenthash】的区别

    hash是代码发生变化，hash值就会改变

    contenthash是自身内容发生改变，contenthash才会发生变化， 一个应用是解决css缓存问题

    chunkhash 是只有chunk的代码发生改变，chunkhash才会发生变化

* mode

  none development production

   webpack默认有内置插件， none就是不开启任何内置插件，development开启开发模式

    相关插件 production开启生产模式插件（比如压缩js代码的插件）

* loader

  webpack对前端来说只支持js模块和json模块， 模块转化器、 模块处理器，让webpack支持更多的模块

* plugin

  有很多冗余的文件，还要手动创建index.html,  针对这些问题，webpack引入插件的概念，进行功能扩展

  插件：webpack的功能扩展 

  html-webpack-plugin(  自动生成html模版)

  clean-webpack-plugin

* chunk

  代码片段

* module 模块

* bundle

  输出的资源文件就叫bundle文件

* bundle、chunk、module的区别
  * 一个chunks可以对应一个或者多个模块
  * 一个模块对应一个chunk，在bundle文件中就是eval代码片段
  * 一个bundle对应一个chunks
  * bundle = webpackBootstrap（启动函数） + chunks

*  有几个入口就有几个bundle的说法对不对？

  不对，一个入口可以做bundle拆分。

## 7 webpack前端项目工程化实战

### 7.1 pc端还是移动端

* 移动端spa
  * ssr
* pc端mpa
* 兼容性：需要兼容的浏览器和版本

### 7.2 多人参与还是单人

* 代码规范
* Eslint+ prettier
* 提交规范

### 7.3 技术栈

* vue
* react
* 样式
  * less
  * sass
  * posts == babel

* Ts & babel -> es6+
* 模版引擎
  * ejs
  * pug

* 是否需要支持三方字体（阿里巴巴普惠体）

### 7.4 工具类

* 安装依赖包 切换国内源 npm config
* .npmrc

## 8 自定义loader

多个loader 是有执行顺序的，自后往前

* 函数 声明式函数 不可以是箭头函数

* 函数必须有返回值

  ```
  replace-loader.js
  
  module.exports = function (source) {
    return source.replace("webpack4", `${this.query.name}-webpackLearning4`)
  }
  ```

* 如何返回多值 this.callback

  ```
  replace-loader.js
  
  module.exports = function (source) {
    const result = source.replace("webpack4", `${this.query.name}-webpackLearning4`)
  	this.callback(null, result)
  }
  ```

  

* 如何处理异步操作 this.async

  ```
  replace-loader-async.js
  
  module.exports = function (source) {
    const callback = this.async()
    let timer = setTimeout(() => {
      clearTimeout(timer)
      const result = source.replace("webpack4", `${this.query.name}-webpackLearning4`)
      callback(null, result)
    }, 2000)
  }
  ```

* 如何处理多个自定义loader

  ```
  module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            "replace-loader.js",
            {
              loader: "replace-loader-async.js",
              options: {
                name: 'xj'
              }
            },
          ],
          exclude: /dist/
        }
      ]
    },
  
  resolveLoader: {
      modules: ["node_modules", "./myLoaders"]
  },
  ```

  

## 9 Browerlist

### 9.1  定义

The config to share target browsers and Node.js versions between different front-end tools.  

 这个配置能够在不同的前端工具中分享目标浏览器和nodejs的版本，主要是为了表示当前项目的浏览器兼容情况。

```
使用方式一：
package.json
"browserslist": [
"last 2 versions",
">1%"
]

postcss.config.js
module.exports = {
  plugins: [
    require("autoprefixer")({
      //兼容can I use浏览器的最近两个版本
      //兼容市场占有率大于1%的浏览器
      //覆盖package.json配置的browserList
      overrideBrowserslist: ["last 2 versions", ">1%"]
    })
  ]
}
postcss.config.js > package.json ,并且package.json 单独写是没有作用的
使用方式二：
.browserslistrc
last 2 versions
>1%
```

**package.json 和 .browserlistrc 单独使用都是没有用的，为了提供给其他插件或者工具使用的。**

### 9.2 查看对应的浏览器

```
npx browserslist "last 2 versions, >1%"
```

## 10 devtool

* devtool: "inline-source-map",

  source-map 被保存在bundle文件内，会增大bundle文件的体积

*  devtool: "source-map",

  独立的source-map

## 11 多页面打包通用方案

```
const glob = require('glob')
const setMpa = () => {
  const entry = {};
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"))
  console.log(entryFiles)

  entryFiles.map((item, index) => {
    const entryFile = item
    const entryName = entryFile.match(/src\/(.*)\/index\.js$/)[1]
    entry[entryName] = entryFile
    htmlWebpackPlugins.push(new htmlWebpackPlugin({
      template: path.join(__dirname, `src/${entryName}/index.html`),
      filename: `${entryName}.html`,
      chunks: [entryName, 'home'], // 模版依赖的chunks
    }))
  })
  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMpa()
```

