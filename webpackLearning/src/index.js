import css from './style/index.css'
import pic from './images/logo.jpg'
import { str } from './a.js' // * webpack对前端来说只支持js模块和json模块 .js .json
import axios from "axios"
console.log(`${str} webpack4.x`)
console.log(pic)
let img = new Image();
img.src = pic
let root = document.querySelector('#app')
root.append(img)
//图片 file-loader  文件复制、挪移
//url-loader 包含file-loader所有的功能

axios.get("/api/info").then(res => {
  console.log(res)
})

var btn = document.createElement("button")
btn.innerHTML = "新增"
document.body.appendChild(btn)

btn.onclick = function () {
  var div = document.createElement("div")
  div.innerHTML = "item"
  document.body.appendChild(div)
}
