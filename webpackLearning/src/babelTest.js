import "@babel/polyfill"
//babel
const arr = [new Promise(() => { }), new Promise(() => { })]
arr.map((item) => {
  console.log(item)
})