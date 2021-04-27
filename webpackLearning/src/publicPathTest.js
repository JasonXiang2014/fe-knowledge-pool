import css from './style/index.css'
import pic from './images/logo.jpg'
let img = new Image();
img.src = pic
let root = document.querySelector('#app')
root.append(img)
