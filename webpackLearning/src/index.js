import css from './style/index.css'
import pic from './images/logo.jpg'
import { str } from './a.js' // * webpack对前端来说只支持js模块和json模块 .js .json
import axios from "axios"
import { addNewButton, number } from './number'
import "@babel/polyfill"
console.log(`${str} webpack4.x`)
console.log(pic)
let img = new Image();
img.src = pic
let root = document.querySelector('#app')
root.append(img)
//图片 file-loader  文件复制、挪移
//url-loader 包含file-loader所有的功能

axios.get("http://localhost:9092/api/info/api/info").then(res => {
  console.log(res)
})

axios.get("/api/info").then(res => {
  console.log(res)
})


addNewButton()
number()

if (module.hot) {
  module.hot.accept("./number.js", () => {
    document.body.removeChild(document.getElementById("customButton"))
    document.body.removeChild(document.getElementById("number"))
    addNewButton()
    number()
  })
}