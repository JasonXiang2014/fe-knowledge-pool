
module.exports = function (source) {
  const callback = this.async()
  let timer = setTimeout(() => {
    clearTimeout(timer)
    const result = source.replace("webpack4", `${this.query.name}-webpackLearning4`)
    callback(null, result)
  }, 1)
}