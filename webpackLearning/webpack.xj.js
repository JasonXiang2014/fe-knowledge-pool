const path = require("path")
module.exports = {
  //入口：
  //string array object
  // entry: "./src/index.js",
  entry: {
    other: "./src/index.js", // object 写法
    a: "./src/a.js",
  },
  mode: "development",
  //出口：
  output: {
    //输出资源的存放位置，必须是绝对路径
    path: path.resolve(__dirname, "./dist"),
    //资源名称 name就是entry里面的key值 占位符的概念 【name】【hash:number】【chunkhash】【contenthash】
    filename: "[name]-[hash:6].js",
  }
}

//spa 单页面应用 单入口
//mpa 多页面应用 多入口 利于seo