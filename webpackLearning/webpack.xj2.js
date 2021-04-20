const path = require("path")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { options } = require("less");

module.exports = {
  //入口：
  entry: {
    index: "./src/index.js",
    index2: "./src/index2.js",
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
        test: /\.css$/,
        use: ['style-loader', "css-loader"]
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        //多个loader 是有执行顺序的，自后往前
        //style-loader Inject CSS into the DOM.
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/"
          }
        }
      },
      {
        test: /\.js$/,
        // use: path.resolve(__dirname, "myLoaders/replace-loader.js"),
        // use: {
        //   loader: path.resolve(__dirname, "myLoaders/replace-loader.js"),
        //   options: {
        //     name: 'xj'
        //   }
        // },
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
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ["index"],
    }),
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index2.html',
      chunks: ["index2"],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/index-[chunkhash:6].css',
    })
  ]
}