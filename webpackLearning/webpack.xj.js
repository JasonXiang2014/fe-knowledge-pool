const path = require("path")
module.exports = {
  //入口：
  //string array object
  // entry: "./src/index.js",
  entry: {
    main: "./src/index.js", // object 写法
  },
  mode: "development",
  //出口：
  output: {
    //输出资源的存放位置，必须是绝对路径
    path: path.resolve(__dirname, "./dist"),
    //资源名称
    filename: "xj.js",
  }
}