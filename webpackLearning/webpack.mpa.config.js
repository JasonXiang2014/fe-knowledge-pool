const path = require("path")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// entry: {
//   index: "./src/index.js",
//   index2: "./src/index2.js",
// },
// new htmlWebpackPlugin({
//   template: './src/index.html',
//   filename: 'index2.html',
//   chunks: ["index2"],
// }),
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

module.exports = {
  //入口：
  entry,
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
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/",
            limit: 1024 * 2,// 小于2kb 转成base64
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
      },
      {
        test: /\.woff2$/,
        use: "file-loader"
      }
    ]
  },
  resolveLoader: {
    modules: ["node_modules", "./myLoaders"]
  },
  devtool: "inline-source-map",
  plugins: [
    ...htmlWebpackPlugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/index-[chunkhash:6].css',
    })
  ]
}