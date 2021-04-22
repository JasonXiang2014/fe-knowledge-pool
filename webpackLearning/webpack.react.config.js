const path = require("path")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  //入口：
  entry: {
    index: "./src/jsxTest.js",
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
        use: "babel-loader"
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