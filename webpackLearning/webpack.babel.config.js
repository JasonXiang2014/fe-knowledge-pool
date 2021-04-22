const path = require("path")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  //入口：
  entry: {
    index: "./src/babelTest.js",
  },
  mode: "development",
  //出口：
  output: {
    //输出资源的存放位置，必须是绝对路径
    path: path.resolve(__dirname, "./dist"),
    //资源名称
    filename: "[name]-[chunkhash:6].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", {
              targets: {
                //目标环境
                edge: "17",
                firefox: "60",
                chrome: "67",
                safari: "11",
              },
              corejs: 3, //默认就是2，可以手动改为3，但是需要额外单独安装
              useBuiltIns: "usage", //使用usage，不需要手动导入@babel/polyfill,会自动导入
            }]], //预设插件
          }
        }
      }
    ]
  },
  resolveLoader: {
    modules: ["node_modules", "./myLoaders"]
  },
  devtool: "inline-source-map",
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ["index"],
    }),
    new CleanWebpackPlugin(),
  ]
}