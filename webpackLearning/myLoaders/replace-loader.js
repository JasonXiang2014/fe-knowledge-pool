//函数 声明式函数 不可以是箭头函数
//函数必须有返回值
//如何返回多值 this.callback
//如何处理异步操作 this.async
//如何处理多个自定义loader
module.exports = function (source) {
  // 1. return
  // console.log(source, this.query)
  // return source.replace("webpack4", `${this.query.name}-webpackLearning4`)
  //2. this.callback
  // const result = source.replace("webpack4", `${this.query.name}-webpackLearning4`)
  // this.callback(null, result)
  //3. this.async
  // const callback = this.async()
  // let timer = setTimeout(() => {
  //   clearTimeout(timer)
  //   const result = source.replace("webpack4", `${this.query.name}-webpackLearning4`)
  //   callback(null, result)
  // }, 2000)
  const result = source.replace("xj", `xiangjian`)
  return result
}