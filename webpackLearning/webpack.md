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
  * filename  资源名称 name就是entry里面的key值 占位符的概念 【name】【hash:number】【chunkhash】【contenthash】

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