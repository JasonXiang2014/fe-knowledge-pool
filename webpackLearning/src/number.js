const addNewButton = function () {
  var btn = document.createElement("button")
  btn.innerHTML = "新增2休闲鞋"
  btn.setAttribute("id", "customButton")
  document.body.appendChild(btn)

  btn.onclick = function () {
    var div = document.createElement("div")
    div.innerHTML = "item"
    document.body.appendChild(div)
  }
}

function number() {
  var div = document.createElement("div")
  div.innerHTML = "333"
  div.setAttribute("id", "number")
  document.body.appendChild(div)
}
export {
  addNewButton,
  number,
}