import React, { Component } from "react";

//HOC Higher-Order Componnets 
//定义： 高阶组件是参数为组件，返回值为新组件的函数
export default class HocPage extends Component {
  state = {};
  render() {
    return (
      <div>
        <h3>HOC page</h3>
        <Foo name="omg"></Foo>
        <Foo2 name="omg2"></Foo2>
      </div>
    );
  }
}

const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props}></Cmp>
    </div>
  )
}

//链式调用

const foo2 = Cmp => props => {
  return (
    <div className="greenBorder">
      <Cmp {...props}></Cmp>
    </div>
  )
}

function Child(props) {
  return <div>Child {props.name}</div>
}

const Foo = foo(Child)
const Foo2 = foo2(foo2(foo(Child)))