const path = require("path")
module.exports = {
  //入口：
  entry: "./src/index.js",
  mode: "development",
  //出口：
  output: {
    //输出资源的存放位置，必须是绝对路径
    path: path.resolve(__dirname, "./build"),
    //资源名称
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        //多个loader 是有执行顺序的，自后往前
        //style-loader Inject CSS into the DOM.
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/",
            limit: 1024 * 2,// 小于2kb 转成base64
          }
        }
      },
      {
        test: /\.woff2$/,
        use: "file-loader"
      }
    ]
  },
}