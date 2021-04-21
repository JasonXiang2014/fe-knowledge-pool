const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = {
  //入口：
  //string array object
  // entry: "./src/index.js",
  entry: {
    other: "./src/index.js", // object 写法
    a: "./src/a.js",
  },
  //none development production
  //webpack默认有内置插件， none就是不开启任何内置插件，development开启开发模式
  //相关插件 production开启生产模式插件（比如压缩js代码的插件）
  mode: "development",
  //出口：
  output: {
    //输出资源的存放位置，必须是绝对路径
    path: path.resolve(__dirname, "./dist"),
    //资源名称 name就是entry里面的key值 占位符的概念 【name】【hash:number】【chunkhash】【contenthash】
    filename: "[name]-[hash:6].js",
  },
  devServer: {
    open: true,
    contentBase: path.join(__dirname, "dist"),
    proxy: {
      "/api": {
        target: "http://localhost:9092/"
      }
    },
  },
  module: { //让webpack支持更多的模块 (webpack对前端来说只支持js模块和json模块)
    //css-loader 只是支持webpack解析css文件，但是还无法使用
    rules: [{
      test: /\.css$/,
      //多个loader 是有执行顺序的，自后往前
      //style-loader Inject CSS into the DOM.
      use: ["style-loader", "css-loader",]
    }, {
      test: /\.(png|jpg|gif)$/i,
      //多个loader 是有执行顺序的，自后往前
      //style-loader Inject CSS into the DOM.
      use: ["url-loader"]
    }],
  },
  plugins: [new htmlWebpackPlugin({
    template: "./src/index.html",
    filename: 'index.html'
  }),
  new CleanWebpackPlugin()
  ]
}

//spa 单页面应用 单入口
//mpa 多页面应用 多入口 利于seo